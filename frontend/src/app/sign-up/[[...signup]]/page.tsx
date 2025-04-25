import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex items-center justify-center min-h-screen">
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
      </div>
    </>
  );
}
