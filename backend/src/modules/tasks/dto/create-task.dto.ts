import { IsString, IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';

export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done'
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  timeEstimate?: number;

  @IsString()
  assigneeId: string;

  @IsOptional()
  @IsString()
  projectId?: string;
}
