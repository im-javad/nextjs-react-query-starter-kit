import { createBook } from "@/services/bookService";
import { CreateBookData } from "@/types/books";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";

const AddBook: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = React.useState<string>("");
  const [author, setAuthor] = React.useState<string>("");
  const [publishedyear, setPublishedYear] = React.useState<number>(0);

  const newBookMutation = useMutation({
    mutationFn: (createData: CreateBookData) => createBook(createData),
    onSuccess: () => {
      router.push("/books");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    newBookMutation.mutate({ title, author, published_year: publishedyear });
  };

  return (
    <div className="middle border border-spacing-2 border-stone-500 p-10 rounded bg-black">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            className="bg-black border border-green-800 p-2 rounded mb-4"
          />
        </div>
        <div>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Author..."
            className="bg-black border border-green-800 p-2 rounded mb-4"
          />
        </div>
        <div>
          <input
            value={publishedyear}
            onChange={(e) => setPublishedYear(Number(e.target.value))}
            type="number"
            placeholder="Published..."
            className="bg-black border border-green-800 p-2 rounded mb-4"
          />
        </div>
        <button
          type="submit"
          className=" w-full bg-cyan-800 rounded text-white py-2"
        >
          {newBookMutation.isPending ? "pending..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
