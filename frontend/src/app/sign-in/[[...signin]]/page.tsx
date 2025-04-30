"use client";

import { SignIn } from "@clerk/nextjs";
const LoginPage = () => {

  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex items-center justify-center min-h-screen">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
