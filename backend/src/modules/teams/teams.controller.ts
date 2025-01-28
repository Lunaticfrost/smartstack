import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  Request 
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto, AddTeamMemberDto, RemoveTeamMemberDto } from './dto/teams.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto, @Request() req) {
    return this.teamsService.createTeam(createTeamDto, req.user.id);
  }

  @Get()
  async getAllTeams(@Request() req) {
    return this.teamsService.getAllTeams(req.user.id);
  }

  @Get(':id')
  async getTeamById(@Param('id') teamId: string, @Request() req) {
    return this.teamsService.getTeamById(teamId, req.user.id);
  }

  @Put(':id')
  async updateTeam(
    @Param('id') teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @Request() req
  ) {
    return this.teamsService.updateTeam(teamId, updateTeamDto, req.user.id);
  }

  @Post(':id/members')
  async addTeamMember(
    @Param('id') teamId: string,
    @Body() addTeamMemberDto: AddTeamMemberDto,
    @Request() req
  ) {
    return this.teamsService.addTeamMember(teamId, req.user.id, addTeamMemberDto.userId);
  }

  @Delete(':id/members')
  async removeTeamMember(
    @Param('id') teamId: string,
    @Body() removeTeamMemberDto: RemoveTeamMemberDto,
    @Request() req
  ) {
    return this.teamsService.removeTeamMember(teamId, req.user.id, removeTeamMemberDto.userId);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') teamId: string, @Request() req) {
    return this.teamsService.deleteTeam(teamId, req.user.id);
  }
}
