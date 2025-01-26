import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UseGuards, 
    Request 
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('tasks')
  @UseGuards(JwtAuthGuard)
  export class TasksController {
    constructor(private tasksService: TasksService) {}
  
    @Post()
    async createTask(
      @Body() createTaskDto: CreateTaskDto, 
      @Request() req
    ) {
      return this.tasksService.createTask(createTaskDto, req.user.id);
    }
  
    @Get()
    async getAllTasks(@Request() req) {
      return this.tasksService.getAllTasks(req.user.id);
    }
  
    @Get(':id')
    async getTaskById(
      @Param('id') taskId: string, 
      @Request() req
    ) {
      return this.tasksService.getTaskById(taskId, req.user.id);
    }
  
    @Put(':id')
    async updateTask(
      @Param('id') taskId: string,
      @Body() updateTaskDto: Partial<CreateTaskDto>,
      @Request() req
    ) {
      return this.tasksService.updateTask(taskId, updateTaskDto, req.user.id);
    }
  
    @Delete(':id')
    async deleteTask(
      @Param('id') taskId: string, 
      @Request() req
    ) {
      return this.tasksService.deleteTask(taskId, req.user.id);
    }
  
    @Post(':id/time')
    async trackTime(
      @Param('id') taskId: string,
      @Body('timeSpent') timeSpent: number,
      @Request() req
    ) {
      return this.tasksService.trackTime(taskId, timeSpent, req.user.id);
    }
  }