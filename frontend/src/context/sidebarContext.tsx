"use client";

import { createContext, useContext, useState, ReactNode } from "react";
type SidebarContextType = {
  selectedSidebar: string;
  setSelectedSidebar: (value: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSidebar, setSelectedSidebar] = useState("Эхлэл");

  return (
    <SidebarContext.Provider value={{ selectedSidebar, setSelectedSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
