"use client";
import { LoginForm } from "../../src/components/Login";
import Image from "next/image";

const Login = () => {
  return (
    <div>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <Image
              src="/Worksync.png"
              alt="worksync logo"
              width={200}
              height={110}
              className="object-cover"
            />
          </a>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
