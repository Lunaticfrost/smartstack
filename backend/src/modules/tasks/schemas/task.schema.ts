import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  assignee: Types.ObjectId;

  @Prop({ required: true })
  project: Types.ObjectId;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  timeEstimate: number;

  @Prop({ required: true })
  timeSpent: number;

  @Prop({ type: [Types.ObjectId], default: [] })
  labels: Types.ObjectId[];

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
