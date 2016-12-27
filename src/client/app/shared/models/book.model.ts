import { Author } from './author.model';
import { Genre } from './genre.model';

export interface IntroductionContent {
  content: string;
}

export interface Book {
  author: Author;
  cover: string;
  description: string;
  genre: Genre;
  id: string;
  introduction: IntroductionContent[];
  likes: number;
  name: string;
  published: Date;
}
