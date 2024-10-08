import { redirect } from "next/dist/server/api-utils";
import * as React from "react";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "books",
      permanent: false,
    },
  };
};

const HomePage = () => {
  return;
};

export default HomePage;
