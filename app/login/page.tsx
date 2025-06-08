"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleSubmit = async (formData: any) => {
    signIn("resend", formData);
  };
  return (
    <div>
      <form action={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email-resend"
          placeholder="Enter your email"
        />
        <button type="submit">Login</button>
      </form>
      <button
        className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
        onClick={() => signIn("google")}
      >
        Login with google
      </button>
      <button
        className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
        onClick={() => signIn("github")}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Login;
