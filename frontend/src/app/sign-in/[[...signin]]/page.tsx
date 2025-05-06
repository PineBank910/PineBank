"use client";

import { SignIn } from "@clerk/nextjs";
const LoginPage = () => {
  return (
    <>
      <div className="h-full min-h-screen w-full flex sm:mt-0 mt-4 sm:items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "green",
            },
          }}
        />
      </div>
    </>
  );
};

export default LoginPage;
