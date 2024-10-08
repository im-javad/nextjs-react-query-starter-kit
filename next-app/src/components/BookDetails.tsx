import { deleteBook, fetchBookById } from "@/services/bookService";
import { Book } from "@/types/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const BookDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();

  const {
    data: book,
    error,
    isLoading,
  } = useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      router.push("/books");
    },
  });

  if (isLoading) return <strong>Loading...</strong>;
  if (error) return <p>Error</p>;
  return (
    <div className="middle border border-spacing-2 border-stone-500 p-10 rounded bg-black">
      <strong>ID: {book?.id}</strong>
      <br />
      <span>Title: {book?.title}</span>
      <br />
      <span>Author: {book?.author}</span>
      <br />
      <span>Published: {book?.published_year}</span>
      <br />
      <span>Created: {book?.created_at}</span>
      <br />
      <br />
      <Link
        href={`/books/${book?.id}/edit`}
        className="me-5 bg-cyan-700 text-white px-6 py-2 rounded font-bold"
      >
        Edit Book
      </Link>
      <button
        className="bg-red-700 px-6 py-2 rounded text-white font-bold"
        onClick={() => mutation.mutate()}
      >
        Delete Book
      </button>
    </div>
  );
};

export default BookDetails;
