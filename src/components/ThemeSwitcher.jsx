"use client";
import { useEffect, useState } from "react";
import { GrSystem } from "react-icons/gr";
import { LuMoonStar, LuSunMoon } from "react-icons/lu";

const ThemeSwitcher = () => {
     const [theme, setTheme] = useState("system");
     useEffect(() => {
          const root = document.documentElement;

          const updateTheme = (mode) => {
               if (mode === "dark") {
                    root.style.setProperty("--background", "#111827");
                    root.style.setProperty("--foreground", "#D1D5DB");
                    setTheme("dark");
               } else if (mode === "light") {
                    root.style.setProperty("--background", "#D1D5DB");
                    root.style.setProperty("--foreground", "#111827");
                    setTheme("light");
               } else {
                    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    if (prefersDark) {
                         root.style.setProperty("--background", "#111827");
                         root.style.setProperty("--foreground", "#D1D5DB");
                    } else {
                         root.style.setProperty("--background", "#D1D5DB");
                         root.style.setProperty("--foreground", "#111827");
                    }
                    setTheme("system");
               }
          };

          updateTheme(theme);
     }, [theme]);

     return (
          <div className="flex gap-1 transition-all duration-300 bg-white rounded-full p-0.5 ring ring-gray-400 dark:bg-gray-800">
               <button onClick={() => setTheme("system")} title="System Theme" className={`p-2 rounded-full transition-all duration-200 ${theme === "system" ? "bg-blue-300 text-blue-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <GrSystem size={20} />
               </button>
               <button onClick={() => setTheme("light")} title="Light Mode" className={`p-2 rounded-full transition-all duration-200 ${theme === "light" ? "bg-yellow-300 text-yellow-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <LuSunMoon size={20} />
               </button>
               <button onClick={() => setTheme("dark")} title="Dark Mode" className={`p-2 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-purple-300 text-purple-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <LuMoonStar size={20} />
               </button>
          </div>
     );
};

export default ThemeSwitcher;