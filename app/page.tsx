"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  const user = session?.user?.name;

  return (
    <div>
      <h1>Hi, {user}, Welcome to worksync!</h1>
      {!session ? (
        <button
          className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
          onClick={() => {
            signIn("google");
            redirect("/dashboard");
          }}
        >
          login with google
        </button>
      ) : (
        <button
          className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
          onClick={() => {
            signOut();
            redirect("/login");
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};
export default Home;
