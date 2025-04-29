"use client";
import React, { useRef } from "react";
import DarkModeToggle from "@/components/dashboard/darkmode";
import NotificationBell from "@/components/dashboard/notificationBell";
import {
  Menu,
  House,
  Search,
  ArrowRightLeft,
  Settings,
  UserRound,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSidebar, setSelectedSidebar] = useState("Dashboard");
  ///////
  const sidebarRef = useRef<HTMLDivElement>(null);
  ///////

  // Handle click outside for mobile sidebar
  React.useEffect(() => {
    if (!isSidebarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  //////////////
  return (
    // <>
    //   <section className="flex relative">
    //     {/* Overlay and sidebar for mobile */}
    //     {!isSidebarOpen ? null : (
    //       <div>
    //         {/* Overlay for mobile */}
    //         <div className="fixed inset-0 z-40 bg-black/30 md:hidden"></div>
    //         {/* Sidebar */}
    //         <div
    //           ref={sidebarRef}
    //           id="SIDEBAR"
    //           className="fixed z-50 top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 border-r shadow-lg transition-transform md:static md:z-0 md:block md:w-[10rem] md:min-w-[10rem] lg:w-[15rem] lg:min-w-[15rem] md:h-screen md:shadow-none">
    //           <div className="w-full h-21 text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-4">
    //             Pinebank
    //           </div>
    //           <div className="w-full">
    //             <div
    //               onClick={() => {
    //                 setSelectedSidebar("Dashboard");
    //               }}
    //               className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
    //               ${selectedSidebar === "Dashboard" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
    //             `}>
    //               <House /> Dashboard
    //             </div>
    //             <div
    //               onClick={() => {
    //                 setSelectedSidebar("Transactions");
    //               }}
    //               className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
    //               ${selectedSidebar === "Transactions" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
    //             `}>
    //               <ArrowRightLeft /> Transactions
    //             </div>
    //             <div
    //               onClick={() => {
    //                 setSelectedSidebar("Accounts");
    //               }}
    //               className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
    //               ${selectedSidebar === "Accounts" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
    //             `}>
    //               <UserRound /> Accounts
    //             </div>
    //             <div
    //               onClick={() => {
    //                 setSelectedSidebar("Settings");
    //               }}
    //               className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
    //               ${selectedSidebar === "Settings" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
    //             `}>
    //               <Settings /> Settings
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     <header className="w-full">
    //       <div className="flex items-center justify-between border-b h-24">
    //         <button
    //           onClick={() => setIsSidebarOpen((prev) => !prev)}
    //           className="focus:outline-none ml-4 md:hidden"
    //           aria-label="Toggle sidebar">
    //           <Menu size={50} />
    //         </button>

    //         <div className="sm:text-4xl text-3xl  ml-8 text-[#343C6A]">
    //           {selectedSidebar}
    //         </div>

    //         <div className="flex gap-7 items-center mr-8">
    //           <div className="hidden  md:flex dark:bg-gray-900 items-center gap-4 pl-6 p-1 sm:w-[8rem] md:w-[13rem] lg:w-[20rem]  h-[3rem] bg-[#F5F7FA] rounded-4xl">
    //             <Search color="#718EBF" />
    //             <input
    //               className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-blue-500 "
    //               placeholder="Search ..."
    //             />
    //           </div>
    //           <DarkModeToggle />
    //           <NotificationBell />
    //           <SignedOut>
    //             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    //               <SignInButton />
    //             </button>
    //             <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
    //               <SignUpButton />
    //             </button>
    //           </SignedOut>
    //           <SignedIn>
    //             <UserButton />
    //           </SignedIn>
    //         </div>
    //       </div>

    //       <div className="md:hidden flex items-center gap-4 pl-5 p-1 w-auto h-[3rem] bg-[#F5F7FA] rounded-4xl mt-5 mx-4 dark:bg-gray-900">
    //         <Search color="#718EBF" />
    //         <input
    //           className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-black"
    //           placeholder="Search ..."
    //         />
    //       </div>
    //     </header>
    //   </section>
    // </>
    <>
      <section className="flex relative">
        {isSidebarOpen && (
          <div
            id="SIDEBAR"
            className="hidden md:block md:w-[10rem] md:min-w-[10rem] lg:w-[15rem] lg:min-w-[15rem] h-screen bg-white dark:bg-gray-800 border-r">
            <div className="w-full h-21 text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-4">
              Pinebank
            </div>
            <div className="w-full">
              <div
                onClick={() => setSelectedSidebar("Dashboard")}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Dashboard" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <House /> Dashboard
              </div>
              <div
                onClick={() => setSelectedSidebar("Transactions")}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Transactions" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <ArrowRightLeft /> Transactions
              </div>
              <div
                onClick={() => setSelectedSidebar("Accounts")}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Accounts" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <UserRound /> Accounts
              </div>
              <div
                onClick={() => setSelectedSidebar("Settings")}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Settings" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <Settings /> Settings
              </div>
            </div>
          </div>
        )}

        <header className="w-full  ">
          <div className="flex items-center justify-between border-b h-24">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="focus:outline-none ml-4 md:hidden"
              aria-label="Toggle sidebar">
              <Menu size={50} />
            </button>

            <div className="sm:text-4xl text-3xl  ml-8 text-[#343C6A]">
              {selectedSidebar}
            </div>

            <div className="flex gap-7 items-center mr-8">
              <div className="hidden  md:flex dark:bg-gray-900 items-center gap-4 pl-6 p-1 sm:w-[8rem] md:w-[13rem] lg:w-[20rem]  h-[3rem] bg-[#F5F7FA] rounded-4xl">
                <Search color="#718EBF" />
                <input
                  className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-blue-500 "
                  placeholder="Search ..."
                />
              </div>
              <DarkModeToggle />
              <NotificationBell />
              <SignedOut>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  <SignInButton />
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  <SignUpButton />
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4 pl-5 p-1 w-auto h-[3rem] bg-[#F5F7FA] rounded-4xl mt-5 mx-4">
            <Search color="#718EBF" />
            <input
              className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-black"
              placeholder="Search ..."
            />
          </div>
          {/* DASHBOARDS CONTENT FROM HERE */}
          <div className="pl-[25px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] flex flex-wrap gap-7   ">
            <div>
              <p className="font-semibold text-lg">My cards</p>
              <div className="mt-5 flex gap-7 ">
                {/* card geed component gargii */}
                <div className=" w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] bg-amber-300 rounded-[15px]">
                  text
                </div>
                <div className=" w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] bg-amber-300 rounded-[15px]">
                  text
                </div>
              </div>
            </div>
            <div className="w-3xs">
              {/* {Transaction component gargii} */}
              <p className="font-semibold text-lg">Recent transactions</p>
              <div className="w-full rounded-2xl bg-white dark:bg-gray-800 ">
                <div className="w-full h-12  ">Some transactions here</div>
                <div className="w-full h-12  ">Some transactions here</div>
                <div className="w-full h-12  ">Some transactions here</div>
                <div className="w-full h-12  ">Some transactions here</div>
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};
export default Dashboard;
