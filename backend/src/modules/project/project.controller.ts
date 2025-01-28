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
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectService.createProject(createProjectDto, req.user.id);
  }

  @Get()
  async getAllProjects(@Request() req) {
    return this.projectService.getAllProjects(req.user.id);
  }

  @Get(':id')
  async getProjectById(@Param('id') projectId: string, @Request() req) {
    return this.projectService.getProjectById(projectId, req.user.id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req
  ) {
    return this.projectService.updateProject(projectId, updateProjectDto, req.user.id);
  }

  @Delete(':id')
  async deleteProject(@Param('id') projectId: string, @Request() req) {
    return this.projectService.deleteProject(projectId, req.user.id);
  }

  @Post(':id/tasks/:taskId')
  async addTaskToProject(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
    @Request() req
  ) {
    return this.projectService.addTaskToProject(projectId, taskId, req.user.id);
  }

  @Delete(':id/tasks/:taskId')
  async removeTaskFromProject(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
    @Request() req
  ) {
    return this.projectService.removeTaskFromProject(projectId, taskId, req.user.id);
  }
}
