import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
    className?: string;
    size?: "sm" | "default" | "lg" | "icon";
    variant?: "default" | "outline" | "ghost" | "secondary";
}

export function ThemeToggle({
    className,
    size = "icon",
    variant = "ghost"
}: ThemeToggleProps) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant={variant}
                size={size}
                className={cn(
                    "transition-smooth focus-ring",
                    size === "icon" && "h-9 w-9 sm:h-10 sm:w-10",
                    className
                )}
                disabled
            >
                <div className="h-4 w-4 animate-pulse bg-muted rounded" />
                <span className="sr-only">Loading theme toggle</span>
            </Button>
        );
    }

    const isDark = theme === "dark";

    return (
        <Button
            variant={variant}
            size={size}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "transition-smooth focus-ring hover:bg-accent",
                size === "icon" && "h-9 w-9 sm:h-10 sm:w-10 rounded-xl",
                className
            )}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative overflow-hidden">
                <Sun
                    className={cn(
                        "h-4 w-4 transition-all duration-300",
                        isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                    )}
                />
                <Moon
                    className={cn(
                        "absolute top-0 left-0 h-4 w-4 transition-all duration-300",
                        isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                    )}
                />
            </div>
            <span className="sr-only">
                {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </span>
        </Button>
    );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <div className="theme-provider">
            {children}
        </div>
    );
}
