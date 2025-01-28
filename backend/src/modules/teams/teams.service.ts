import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './schemas/team.schema';
import { CreateTeamDto, UpdateTeamDto } from './dto/teams.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, userId: string): Promise<Team> {
    const team = new this.teamModel({
      ...createTeamDto,
      createdBy: userId,
      members: [userId, ...(createTeamDto.members || [])]
    });
    
    const savedTeam = await team.save();
    
    // Add team to users' teams array
    await this.userModel.updateMany(
      { _id: { $in: team.members } },
      { $push: { teams: team._id } }
    );

    return savedTeam;
  }

  async getAllTeams(userId: string): Promise<Team[]> {
    return this.teamModel.find({
      members: userId
    }).populate('members', 'name email');
  }

  async getTeamById(teamId: string, userId: string): Promise<Team> {
    const team = await this.teamModel.findOne({
      _id: teamId,
      members: userId
    }).populate('members', 'name email');

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async updateTeam(teamId: string, updateTeamDto: UpdateTeamDto, userId: string): Promise<Team> {
    const team = await this.teamModel.findOneAndUpdate(
      { _id: teamId, createdBy: userId },
      updateTeamDto,
      { new: true }
    ).populate('members', 'name email');

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async addTeamMember(teamId: string, userId: string, newMemberId: string): Promise<Team> {
    const team = await this.teamModel.findOneAndUpdate(
      { _id: teamId, createdBy: userId },
      { $addToSet: { members: newMemberId } },
      { new: true }
    ).populate('members', 'name email');

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Add team to new member's teams array
    await this.userModel.findByIdAndUpdate(
      newMemberId,
      { $addToSet: { teams: teamId } }
    );

    return team;
  }

  async removeTeamMember(teamId: string, userId: string, memberId: string): Promise<Team> {
    const team = await this.teamModel.findOneAndUpdate(
      { _id: teamId, createdBy: userId },
      { $pull: { members: memberId } },
      { new: true }
    ).populate('members', 'name email');

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Remove team from member's teams array
    await this.userModel.findByIdAndUpdate(
      memberId,
      { $pull: { teams: teamId } }
    );

    return team;
  }

  async deleteTeam(teamId: string, userId: string): Promise<void> {
    const team = await this.teamModel.findOneAndDelete({
      _id: teamId,
      createdBy: userId
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Remove team from all members' teams array
    await this.userModel.updateMany(
      { teams: teamId },
      { $pull: { teams: teamId } }
    );
  }
}
