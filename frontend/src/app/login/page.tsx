import React from "react";
import { WorldMapDemo } from "./_components/worldmap";

const LoginPage = () => {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <WorldMapDemo />
        <div className=" z-10 absolute m-7 opacity-90"></div>
      </div>
    </>
  );
};

export default LoginPage;
