import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage("fadeOut");
        }
    }, [location, displayLocation]);

    const handleAnimationEnd = () => {
        if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
        }
    };

    return (
        <div
            className={cn(
                "transition-opacity duration-300 min-h-[calc(100vh-3.5rem)]",
                transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
            )}
            onAnimationEnd={handleAnimationEnd}
        >
            {children}
        </div>
    );
}
