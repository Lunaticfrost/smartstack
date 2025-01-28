import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const project = new this.projectModel({
      ...createProjectDto,
      createdBy: userId
    });
    return project.save();
  }

  async getAllProjects(userId: string): Promise<Project[]> {
    return this.projectModel.find({
      $or: [
        { createdBy: userId },
        { team: { $in: await this.getUserTeams(userId) } }
      ]
    })
    .populate('team', 'name')
    .populate('tasks', 'title status')
    .exec();
  }

  async getProjectById(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOne({
      _id: projectId,
      $or: [
        { createdBy: userId },
        { team: { $in: await this.getUserTeams(userId) } }
      ]
    })
    .populate('team', 'name members')
    .populate('tasks', 'title status assigneeId dueDate')
    .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async updateProject(
    projectId: string, 
    updateProjectDto: UpdateProjectDto, 
    userId: string
  ): Promise<Project> {
    const project = await this.projectModel.findOneAndUpdate(
      { 
        _id: projectId,
        createdBy: userId
      },
      updateProjectDto,
      { new: true }
    )
    .populate('team', 'name')
    .populate('tasks', 'title status');

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async deleteProject(projectId: string, userId: string): Promise<void> {
    const result = await this.projectModel.deleteOne({
      _id: projectId,
      createdBy: userId
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Project not found');
    }
  }

  async addTaskToProject(projectId: string, taskId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
        createdBy: userId
      },
      { $addToSet: { tasks: taskId } },
      { new: true }
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async removeTaskFromProject(projectId: string, taskId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
        createdBy: userId
      },
      { $pull: { tasks: taskId } },
      { new: true }
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  private async getUserTeams(userId: string): Promise<string[]> {
    const projects = await this.projectModel
      .find({ 'team.members': userId })
      .distinct('team');
    return projects.map(id => id.toString());
  }
}
