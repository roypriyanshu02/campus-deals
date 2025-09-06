import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SwipeableProps {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    threshold?: number;
    className?: string;
}

export function Swipeable({
    children,
    onSwipeLeft,
    onSwipeRight,
    threshold = 100,
    className
}: SwipeableProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset swipe when component unmounts or swipe action is complete
    const resetSwipe = () => {
        setTouchStart(null);
        setTouchEnd(null);
        setSwipeDistance(0);
        setIsSwiping(false);
    };

    // Handle start of swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    // Handle movement during swipe
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;

        setTouchEnd(e.targetTouches[0].clientX);
        const distance = touchStart - e.targetTouches[0].clientX;

        // Apply some resistance when swiping
        const resistance = 0.5;
        setSwipeDistance(distance * resistance);
    };

    // Handle end of swipe
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const swipeDirection = touchStart - touchEnd;
        const isLeftSwipe = swipeDirection > threshold;
        const isRightSwipe = swipeDirection < -threshold;

        if (isLeftSwipe && onSwipeLeft) {
            onSwipeLeft();
        } else if (isRightSwipe && onSwipeRight) {
            onSwipeRight();
        }

        // Reset after gesture is complete
        resetSwipe();
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            resetSwipe();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn("relative touch-pan-y", className)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                transform: isSwiping ? `translateX(${-swipeDistance}px)` : undefined,
                transition: !isSwiping ? 'transform 0.3s ease-out' : undefined,
            }}
        >
            {children}
        </div>
    );
}
