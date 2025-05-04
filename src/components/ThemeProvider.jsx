"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
     const [theme, setTheme] = useState("system");

     useEffect(() => {
          const savedTheme = localStorage.getItem("theme");
          setTheme(savedTheme || "system");
     }, []);

     useEffect(() => {
          const root = document.documentElement;

          const applyTheme = (mode) => {
               let actualTheme = mode;
               if (mode === "system") {
                    actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                         ? "dark"
                         : "light";
               }

               if (actualTheme === "dark") {
                    root.classList.add("dark");
                    root.style.setProperty("--background", "#1A1A1A");
                    root.style.setProperty("--foreground", "#D1D5DB");
               } else {
                    root.classList.remove("dark");
                    root.style.setProperty("--background", "#FAF9F6");
                    root.style.setProperty("--foreground", "#2A2A2A");
               }

               if (mode === "light" || mode === "dark") {
                    localStorage.setItem("theme", mode);
               } else {
                    localStorage.removeItem("theme");
               }
          };

          applyTheme(theme);
     }, [theme]);

     return (
          <ThemeContext.Provider value={{ theme, setTheme }}>
               {children}
          </ThemeContext.Provider>
     );
};