import { Check, User2Icon } from "lucide-react";

// nav items
export const data = {
  navMain: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User2Icon,
      isActive: true,
      isAdmin: false,
    },
    {
      title: "Manage Task",
      url: "/dashboard/task",
      icon: Check,
      isActive: true,
      isAdmin: true,
    },
  ],
};
