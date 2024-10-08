// src/types/books.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  created_at: string;
}

export type FetchBooks = Book[];
export type FetchBookById = Book;
export type CreateBookData = Omit<Book, "id" | "created_at">;
export type UpdateBookData = Partial<Book>;
export type UpdateBook = {
  id: string;
  updateData: UpdateBookData;
};
