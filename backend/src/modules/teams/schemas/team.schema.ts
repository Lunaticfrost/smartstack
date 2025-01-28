import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  members: Types.ObjectId[];

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  projects: Types.ObjectId[];

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);