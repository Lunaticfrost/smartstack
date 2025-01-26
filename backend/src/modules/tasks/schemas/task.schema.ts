import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskPriority, TaskStatus } from '../dto/create-task.dto';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: TaskPriority, required: true })
  priority: TaskPriority;

  @Prop({ enum: TaskStatus, required: true })
  status: TaskStatus;

  @Prop()
  dueDate?: Date;

  @Prop()
  timeEstimate?: number;

  @Prop()
  timeSpent?: number;

  @Prop({ type: String, ref: 'User', required: true })
  assigneeId: string;

  @Prop({ type: String, ref: 'Project' })
  projectId?: string;

  @Prop({ type: String, ref: 'User', required: true })
  createdBy: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);