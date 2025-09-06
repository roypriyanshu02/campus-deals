import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
    images: string[];
    alt: string;
    className?: string;
}

export function ImageCarousel({ images, alt, className }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setIsLoading(true);
    };

    const goToNext = useCallback(() => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setIsLoading(true);
    }, [currentIndex, images.length]);

    // Auto-advance carousel every 5 seconds if more than one image
    useEffect(() => {
        if (images.length > 1) {
            const slideInterval = setInterval(goToNext, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [goToNext, images.length]);

    // Manual swipe handling
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        const difference = touchStartX.current - touchEndX.current;
        const threshold = 50; // Minimum swipe distance

        if (difference > threshold) {
            goToNext(); // Swiped left
        } else if (difference < -threshold) {
            goToPrevious(); // Swiped right
        }
    };

    return (
        <div
            className={cn("relative group rounded-lg overflow-hidden", className)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Loading background */}
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                <div className={cn("w-10 h-10 rounded-lg bg-primary/10 animate-pulse", !isLoading && "hidden")}></div>
            </div>

            {/* Main image */}
            <img
                src={images[currentIndex]}
                alt={`${alt} - image ${currentIndex + 1} of ${images.length}`}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsLoading(false)}
                loading={currentIndex === 0 ? "eager" : "lazy"}
            />

            {/* Navigation controls - only show if more than one image */}
            {images.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/30 backdrop-blur-sm hover:bg-background/50"
                        onClick={goToPrevious}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/30 backdrop-blur-sm hover:bg-background/50"
                        onClick={goToNext}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    currentIndex === index
                                        ? "bg-primary w-4"
                                        : "bg-background/50 hover:bg-background"
                                )}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsLoading(true);
                                }}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
