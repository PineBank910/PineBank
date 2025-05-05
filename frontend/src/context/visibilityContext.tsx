import React, { createContext, useContext, useState } from "react";

interface VisibilityContextProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const VisibilityContext = createContext<VisibilityContextProps | undefined>(
  undefined
);

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <VisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return context;
};