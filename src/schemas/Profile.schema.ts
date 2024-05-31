import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

export type Gender = 'Male' | 'Female';

@Schema()
export class Profile {
  @Prop()
  displayName: string; // display name

  @Prop()
  gender: Gender;

  @Prop()
  birthday: string;

  @Prop()
  weight: string;

  @Prop()
  height: string;

  @Prop()
  interest: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
