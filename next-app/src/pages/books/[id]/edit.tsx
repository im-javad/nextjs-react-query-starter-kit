import EditBook from "@/components/EditBook";
import { useRouter } from "next/router";
import * as React from "react";

const EditBookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EditBook />;
};

export default EditBookPage;
