import { Author } from './author.model';
import { Genre } from './genre.model';

/**
 * This interface is auxiliar to the Book interface.
 * It serves to encapsulate the contet information of the introduction.
 */
export interface IntroductionContent {
  content: string;
}

/**
 * This interface is used for Book information.
 */
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
