import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enums/author.enum';

@Schema({
  timestamps: true,
})
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: Gender, default: Gender.Other })
  gender: Gender;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio: string;

  @Prop()
  birthDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
