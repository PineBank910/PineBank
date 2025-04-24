import { SignUp } from "@clerk/nextjs";
//import { WorldMapDemo } from '@/app/sign-in/_components/worldmap';
export default function SignUpPage() {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        {/* <WorldMapDemo /> */}
        <div className=" z-10">
          <div className="flex items-center justify-center">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
          </div>
        </div>
      </div>
    </>
  );
}
