import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Box } from "@mui/material";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const [value, setValue] = useLocalStorage("token", "");

  return (
    <>
      <Box>
        <Navbar />
        <Box marginTop={10} marginLeft={10}>
          <h1>Local Storage Test , Set a value and refresh</h1>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
