import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from '../enums/book.enum';
import { Author } from 'src/author/schemas/author.schema';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
