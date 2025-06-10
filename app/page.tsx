"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Login from "./login/page";
import { useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  const user = session?.user?.name;
  const [handlePop, setHandlePop] = useState(false);

  return (
    <div className="w-full bg-black h-screen text-white relative">
      <h1>Hi, {user}, Welcome to worksync!</h1>
      {session ? (
        <div>
          <button
            className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
            onClick={() => {
              signOut();
              redirect("/login");
            }}
          >
            Logout
          </button>
          <button onClick={redirect("/dashboard")}>Dashboard</button>
        </div>
      ) : (
        <button
          onClick={() => setHandlePop(true)}
          className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
        >
          Login
        </button>
      )}

      {/* login form pop */}
      {handlePop && (
        <div className="absolute inset-0 top-0 left-0 w-full">
          <button
            onClick={() => setHandlePop(false)}
            className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer absolute right-5 top-5"
          >
            Close
          </button>

          <Login />
        </div>
      )}
    </div>
  );
};
export default Home;
