import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    console.log("createTaskDto", createTaskDto);
    console.log("userId", userId);
    const createdTask = new this.taskModel({
      ...createTaskDto,
      createdBy: userId
    });
    return createdTask.save();
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ 
      $or: [
        { createdBy: userId },
        { assigneeId: userId }
      ]
    }).populate('assigneeId');
    return tasks;
  }

  async getTaskById(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({
      _id: taskId,
      $or: [
        { createdBy: userId },
        { assigneeId: userId }
      ]
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTask(
    taskId: string, 
    updateTaskDto: Partial<CreateTaskDto>, 
    userId: string
  ): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { 
        _id: taskId,
        $or: [
          { createdBy: userId },
          { assigneeId: userId }
        ]
      }, 
      updateTaskDto, 
      { new: true }
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const result = await this.taskModel.deleteOne({
      _id: taskId,
      $or: [
        { createdBy: userId },
        { assigneeId: userId }
      ]
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async trackTime(
    taskId: string, 
    timeSpent: number, 
    userId: string
  ): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { 
        _id: taskId,
        $or: [
          { createdBy: userId },
          { assigneeId: userId }
        ]
      },
      { $inc: { timeSpent } },
      { new: true }
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}