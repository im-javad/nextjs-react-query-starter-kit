import { fetchBooks } from "@/services/bookService";
import { Book, FetchBooks } from "@/types/books";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import * as React from "react";

const BookList: React.FC = () => {
  const {
    data: books,
    error,
    isLoading,
  } = useQuery<FetchBooks, Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading || !books) return <strong>Loading...</strong>;
  if (error) return <p>Error</p>;
  return (
    <>
      <Link href={"/books/new"}>
        <div className="w-full flex justify-center bg-white text-black py-3 font-bold">
          Create A New Book +
        </div>
      </Link>
      <div className="middle border border-gray-500 p-4 rounded">
        <ul>
          {books?.map((book: Book) => (
            <li key={book.id}>
              <span>Title: {book.title}</span>
              <br />
              <span>Author: {book.author}</span>
              <br />
              <span>Published: {book.published_year}</span>
              <br />
              <span>Created: {book.created_at}</span>
              <br />
              <div className="mt-5 mb-3">
                <Link
                  href={`/books/${book.id}`}
                  className=" bg-violet-700 text-white py-3 px-6 rounded"
                >
                  Visit Compeltely
                </Link>
              </div>
              <div>
                ---------------------------------------------------------------------
              </div>
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
