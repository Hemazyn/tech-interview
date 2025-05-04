"use client";
import { useTheme } from "@/components/ThemeProvider";
import { GrSystem } from "react-icons/gr";
import { LuMoonStar, LuSunMoon } from "react-icons/lu";

const ThemeSwitcher = () => {
     const { theme, setTheme } = useTheme();

     return (
          <div className="flex gap-1 transition-all duration-300 bg-white rounded-full p-0.5 ring ring-gray-400 dark:bg-gray-800">
               <button onClick={() => setTheme("system")} title="System Theme" className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${theme === "system" ? "bg-blue-300 text-blue-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <GrSystem size={20} />
               </button>
               <button onClick={() => setTheme("light")} title="Light Mode" className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${theme === "light" ? "bg-yellow-300 text-yellow-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <LuSunMoon size={20} />
               </button>
               <button onClick={() => setTheme("dark")} title="Dark Mode" className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${theme === "dark" ? "bg-purple-300 text-purple-700" : "text-gray-600 dark:text-gray-300"}`}>
                    <LuMoonStar size={20} />
               </button>
          </div>
     );
};

export default ThemeSwitcher;