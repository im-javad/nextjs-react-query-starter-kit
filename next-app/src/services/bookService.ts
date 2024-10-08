import {
  Book,
  CreateBookData,
  FetchBookById,
  FetchBooks,
  UpdateBook,
} from "@/types/books";
import Axios from "@/utils/axiosConfig";

export const fetchBooks = async (): Promise<FetchBooks> => {
  const response = await Axios.get("/books");
  return response.data.data;
};

export const fetchBookById = async (id: string): Promise<FetchBookById> => {
  const response = await Axios.get(`/books/${id}`);
  return response.data.data;
};

export const createBook = async (createData: CreateBookData): Promise<Book> => {
  const response = await Axios.post("/books", createData);
  return response.data;
};

export const updateBook = async ({
  id,
  updateData,
}: UpdateBook): Promise<string> => {
  const response = await Axios.put(`/books/${id}`, updateData);
  return id;
};

export const deleteBook = async (id: string): Promise<void> => {
  await Axios.delete(`/books/${id}`);
};
