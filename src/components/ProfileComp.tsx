import React from "react";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";

const ProfileComp = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40%] flex flex-col items-center justify-center shadow-2xl rounded-md p-10 gap-2">
        <img
          src={user?.image}
          alt=""
          className="w-[100px] rounded-full border-2 border-amber-500"
        />
        <div className="flex justify-center items-center w-full gap-2 text-[14px]">
          <div className="w-full gap-1 flex flex-col">
            <Label className="text-[14px]" htmlFor="phone">
              Email
            </Label>
            <p className="p-1 rounded-sm border-2 border-gray-300">
              {user?.email}
            </p>
          </div>
          <div className="w-full gap-1 flex flex-col">
            <Label className="text-[14px]" htmlFor="name">
              Name
            </Label>
            <p className="p-1 rounded-sm border-2 border-gray-300">
              {user?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-2  text-[14px]">
          <div className="w-full gap-1 flex flex-col">
            <Label className="text-[14px]" htmlFor="phone">
              Phone
            </Label>
            <p className="p-1 rounded-sm border-2 border-gray-300">
              {user?.phone}
            </p>
          </div>
          <div className="w-full gap-1 flex flex-col">
            <Label className="text-[14px]" htmlFor="role">
              Role
            </Label>
            <p className="p-1 rounded-sm border-2 border-gray-300">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
