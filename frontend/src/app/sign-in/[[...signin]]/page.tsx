import React from "react";
import { WorldMapDemo } from "../_components/worldmap";
import { SignIn } from "@clerk/nextjs";
const LoginPage = () => {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <WorldMapDemo />
        <div className=" z-10 absolute m-7 opacity-90">
          <div className="flex items-center justify-center min-h-screen">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
