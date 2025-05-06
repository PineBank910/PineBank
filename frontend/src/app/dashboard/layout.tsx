// "use client";
// import Image from "next/image";
// // import FetchBankAccount from "@/utils/fetchBankAccount";
// import { useRouter } from "next/navigation";
// import React, { useRef } from "react";
// import DarkModeToggle from "@/components/dashboard/darkmode";
// import ToggleVisibility from "@/components/dashboard/toggleVisibility";
// import NotificationBell from "@/components/dashboard/notificationBell";
// import { Menu, House, Settings, UserRound, Send } from "lucide-react";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { useState } from "react";
// import { VisibilityProvider } from "@/context/visibilityContext";
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // FetchBankAccount();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [selectedSidebar, setSelectedSidebar] = useState("Эхлэл");

//   const sidebarRef = useRef<HTMLDivElement>(null);

//   React.useEffect(() => {
//     if (!isSidebarOpen) return;
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node)
//       ) {
//         setIsSidebarOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isSidebarOpen]);
//   const handleSidebarClick = () => {
//     router.push("/dashboard");
//     setSelectedSidebar("Эхлэл");
//   };
//   return (
//     <>
//       <VisibilityProvider>
//         {" "}
//         {/** Gaduur ni context ugsun bolohoor busad page deeree ashiglaj bolno. Transfer, Dashboard, Account deer */}
//         <section className="flex relative">
//           {isSidebarOpen && (
//             <div
//               id="SIDEBAR"
//               className="hidden md:block md:w-[10rem] md:min-w-[10rem] lg:w-[15rem] lg:min-w-[15rem] min-h-screen bg-white dark:bg-gray-800 border-r">
//               <div className="flex justify-center items-center w-full h-21 text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 ">
//                 <div
//                   onClick={handleSidebarClick}
//                   className="dark:hidden cursor-pointer "
//                   style={{
//                     position: "relative",
//                     width: "50px",
//                     aspectRatio: "1/1",
//                   }}>
//                   <Image
//                     src="/images/Pinebank_Printstream.png"
//                     alt="Example"
//                     fill
//                     style={{ objectFit: "contain" }}
//                   />
//                 </div>
//                 <span
//                   onClick={handleSidebarClick}
//                   className="hidden dark:block cursor-pointer">
//                   P
//                 </span>
//                 <p className="cursor-pointer " onClick={handleSidebarClick}>
//                   inebank
//                 </p>
//               </div>
//               <div className="w-full">
//                 <div
//                   onClick={() => {
//                     setSelectedSidebar("Эхлэл");
//                     router.push("/dashboard");
//                   }}
//                   className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
//                   ${selectedSidebar === "Эхлэл" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
//                 `}>
//                   <House /> Эхлэл
//                 </div>
//                 <div
//                   onClick={() => {
//                     setSelectedSidebar("Гүйлгээ");
//                     router.push("/dashboard/transfer");
//                   }}
//                   className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
//                   ${selectedSidebar === "Гүйлгээ" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
//                 `}>
//                   <Send /> Гүйлгээ
//                 </div>
//                 {/* <div
//                 onClick={() => {
//                   setSelectedSidebar("Transactions");
//                   router.push("/dashboard/transactions");
//                 }}
//                 className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
//                   ${selectedSidebar === "Transactions" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
//                 `}>
//                 <ArrowRightLeft /> Transactions
//               </div> */}
//                 <div
//                   onClick={() => {
//                     setSelectedSidebar("Данс");
//                     router.push("/dashboard/accounts");
//                   }}
//                   className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
//                   ${selectedSidebar === "Данс" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
//                 `}>
//                   <UserRound /> Данс
//                 </div>
//                 <div
//                   onClick={() => {
//                     setSelectedSidebar("Тохиргоо");
//                     router.push("/dashboard/settings");
//                   }}
//                   className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
//                   ${selectedSidebar === "Тохиргоо" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
//                 `}>
//                   <Settings /> Тохиргоо
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="w-full">
//             <header className="flex items-center justify-between border-b h-24 w-full">
//               <button
//                 onClick={() => setIsSidebarOpen((prev) => !prev)}
//                 className="focus:outline-none ml-4 md:hidden"
//                 aria-label="Toggle sidebar">
//                 <Menu size={50} />
//               </button>
//               <div className="flex flex-col justify-between items-center sm:flex-row w-full">
//                 <div className="sm:text-4xl text-3xl md:ml-4  lg:ml-8 text-[#343C6A]">
//                   {selectedSidebar}
//                 </div>

//                 <div className="flex gap-4 md:gap-7 items-center mr-8">
//                   {/* <div className="hidden  md:flex dark:bg-gray-900 items-center gap-4 pl-6 p-1 sm:w-[8rem] md:w-[13rem] lg:w-[20rem]  h-[3rem] bg-[#F5F7FA] rounded-4xl">
//                   <Search color="#718EBF" />
//                   <input
//                     className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-blue-500 "
//                     placeholder="Search ..."
//                   />
//                 </div> */}
//                   <ToggleVisibility />
//                   <DarkModeToggle />
//                   <NotificationBell />
//                   <SignedOut>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//                       <SignInButton />
//                     </button>
//                     <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
//                       <SignUpButton />
//                     </button>
//                   </SignedOut>
//                   <SignedIn>
//                     <UserButton />
//                   </SignedIn>
//                 </div>
//               </div>
//             </header>

//             {/* <div className="md:hidden flex items-center gap-4 pl-5 p-1 w-auto h-[3rem] bg-[#F5F7FA] rounded-4xl mt-5 mx-4">
//             <Search color="#718EBF" />
//             <input
//               className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-black"
//               placeholder="Search ..."
//             />
//           </div> */}
//             {/* DASHBOARDS CONTENT FROM HERE */}
//             {children}
//           </div>
//         </section>
//       </VisibilityProvider>
//     </>
//   );
// }
///////////////////////////////////////////////////////////
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import DarkModeToggle from "@/components/dashboard/darkmode";
import ToggleVisibility from "@/components/dashboard/toggleVisibility";
import NotificationBell from "@/components/dashboard/notificationBell";
import {
  Menu,
  House,
  Settings,
  UserRound,
  Send,
  NotepadText,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { VisibilityProvider } from "@/context/visibilityContext";
import { useSidebar } from "@/context/sidebarContext";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar initially closed
  // const [selectedSidebar, setSelectedSidebar] = useState("Эхлэл");
  const { selectedSidebar, setSelectedSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        window.innerWidth < 768 && // Only close sidebar for screens smaller than 768px
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false); // Close sidebar
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSidebarClick = () => {
    router.push("/dashboard");
    setSelectedSidebar("Эхлэл");
  };

  return (
    <>
      <VisibilityProvider>
        <section className="flex relative">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div
              id="SIDEBAR"
              ref={sidebarRef} // Attach ref to the sidebar
              className="absolute md:relative z-50  w-[10rem] min-w-[10rem] lg:w-[15rem] lg:min-w-[15rem] min-h-screen bg-white dark:bg-gray-800 border-r">
              <div className="flex justify-center items-center w-full h-21 text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
                <div
                  onClick={handleSidebarClick}
                  className="dark:hidden cursor-pointer"
                  style={{
                    position: "relative",
                    width: "50px",
                    aspectRatio: "1/1",
                  }}>
                  <Image
                    src="/images/Pinebank_Printstream.png"
                    alt="Example"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span
                  onClick={handleSidebarClick}
                  className="hidden dark:block cursor-pointer">
                  P
                </span>
                <p className="cursor-pointer" onClick={handleSidebarClick}>
                  inebank
                </p>
              </div>
              <div className="w-full">
                <div
                  onClick={() => {
                    setSelectedSidebar("Эхлэл");
                    router.push("/dashboard");
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition ${
                    selectedSidebar === "Эхлэл"
                      ? "text-blue-600 dark:hover:bg-gray-700 hover:bg-gray-100"
                      : "dark:hover:bg-gray-700 hover:bg-gray-100"
                  }`}>
                  <House /> Эхлэл
                </div>
                <div
                  onClick={() => {
                    setSelectedSidebar("Гүйлгээ");
                    router.push("/dashboard/transfer");
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition ${
                    selectedSidebar === "Гүйлгээ"
                      ? "text-blue-600 dark:hover:bg-gray-700 hover:bg-gray-100"
                      : "dark:hover:bg-gray-700 hover:bg-gray-100"
                  }`}>
                  <Send /> Гүйлгээ
                </div>
                <div
                  onClick={() => {
                    setSelectedSidebar("Данс");
                    router.push("/dashboard/accounts");
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition ${
                    selectedSidebar === "Данс"
                      ? "text-blue-600 dark:hover:bg-gray-700 hover:bg-gray-100"
                      : "dark:hover:bg-gray-700 hover:bg-gray-100"
                  }`}>
                  <UserRound /> Данс
                </div>
                <div
                  onClick={() => {
                    setSelectedSidebar("Тохиргоо");
                    router.push("/dashboard/settings");
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition ${
                    selectedSidebar === "Тохиргоо"
                      ? "text-blue-600 dark:hover:bg-gray-700 hover:bg-gray-100"
                      : "dark:hover:bg-gray-700 hover:bg-gray-100"
                  }`}>
                  <Settings /> Тохиргоо
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="w-full">
            <header className="flex items-center justify-between border-b h-24 w-full">
              {/* Menu Button */}
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)} // Toggle sidebar
                className="focus:outline-none ml-4 md:hidden"
                aria-label="Toggle sidebar">
                <Menu size={50} />
              </button>
              <div className="flex flex-col justify-between items-center sm:flex-row w-full">
                <div className="sm:text-4xl text-3xl sm:ml-4 lg:ml-8 xl:ml-10 text-[#343C6A]">
                  {selectedSidebar}
                </div>
                <div className="flex gap-4 sm:gap-7 items-center sm:mr-8">
                  <ToggleVisibility />
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
            </header>
            {children}
          </div>
        </section>
      </VisibilityProvider>
    </>
  );
}
