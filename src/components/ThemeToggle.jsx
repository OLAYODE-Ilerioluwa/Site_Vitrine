import {Moon,Sun} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";



export const ThemeToggle = () => {
    // Initialisation paresseuse : évite un setState dans un effet au montage
    const [isDarkMode, setIsDarkMode] = useState(
        () => document.documentElement.classList.contains("dark")
    );


    const toggleTheme = () => {
        if (isDarkMode){
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light")
            setIsDarkMode(false);
            
        }else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark")
            setIsDarkMode(true);
        }
    };

    return (
    <button 
        onClick={toggleTheme} 
        className={cn(
            "p-2 rounded-full transition-colors duration-300 focus:outline-none"
        )}
    > 
        {""}
        {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-300"/>
        ) : (
            <Moon className="h-5 w-5 text-blue-300" />
        )}
        </button>
    );
}