"use client";
import { Main } from "./components";
import { useAuthContext } from "../src/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuthContext();
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, [user, router]);

  return (
    <Main>
      <h1>TOD</h1>
    </Main>
  );
};

export default Home;
