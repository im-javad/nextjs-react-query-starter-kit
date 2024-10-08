import { fetchBookById, updateBook } from "@/services/bookService";
import { FetchBookById, UpdateBookData } from "@/types/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { space } from "postcss/lib/list";
import * as React from "react";

const EditBook: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const ID = id as string;

  const queryClient = useQueryClient();

  const {
    data: book,
    error,
    isLoading,
  } = useQuery<FetchBookById, Error>({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(ID),
    enabled: !!id,
  });

  const editMutation = useMutation({
    mutationFn: (updateData: UpdateBookData) =>
      updateBook({ id: ID, updateData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const [title, setTitle] = React.useState<string>(book?.title || "");
  const [author, setAuthor] = React.useState<string>(book?.author || "");
  const [publishedYear, setPublishedYear] = React.useState<number>(
    book?.published_year || 0
  );

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    editMutation.mutate({ title, author, published_year: publishedYear });
  };

  if (isLoading) return <strong>Loading...</strong>;
  if (error) return <span>Error!</span>;
  if (!book) return <span>Hello Hacker</span>;
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
            value={publishedYear}
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
          {editMutation.isPending ? "pending..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
