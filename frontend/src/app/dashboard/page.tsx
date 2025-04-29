import React from "react";
import DarkModeToggle from "@/components/darkmode";
import { Menu } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Dashboard = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-20 h-20", // Custom width and height
      userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };
  return (
    <>
      <header className="flex items-center justify-between mr-4  ml-4 mt-4 border-b">
        <Menu size={50} />
        <div className="text-2xl md:text-3xl">Dashboard</div>
        <div className="flex gap-7 items-center">
          <DarkModeToggle />
          <SignedOut>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              <SignInButton />
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              <SignUpButton />
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={userButtonAppearance} />
          </SignedIn>
        </div>
      </header>
      <div className="w-full bg-blue-400 h-12 mt-5 mb-5">Search bar gsh</div>
    </>
  );
};
export default Dashboard;
