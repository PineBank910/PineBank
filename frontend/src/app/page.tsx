import DarkModeToggle from "@/components/darkmode";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Home() {
  return (
    <>
      <header className="w-full h-14 flex bg-amber-500 dark:bg-blue-600">
        <DarkModeToggle />
        <p>Example text to check font</p>
      </header>
      <div className="w-full ">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
