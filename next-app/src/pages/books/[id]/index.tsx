import BookDetails from "@/components/BookDetails";
import { useRouter } from "next/router";

const BookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return <BookDetails id={id as string} />;
};

export default BookPage;
