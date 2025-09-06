import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface DoubleTapProps {
    onDoubleTap: () => void;
    className?: string;
    children: React.ReactNode;
}

export function DoubleTap({ onDoubleTap, className, children }: DoubleTapProps) {
    const [tapped, setTapped] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const tapCount = useRef(0);

    // Clear timers on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleTap = () => {
        tapCount.current += 1;

        if (tapCount.current === 1) {
            // First tap - start timer
            timerRef.current = setTimeout(() => {
                // Single tap timeout
                tapCount.current = 0;
                timerRef.current = null;
            }, 300); // 300ms is typical double-tap detection time
        } else if (tapCount.current === 2) {
            // Double tap detected
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            // Execute double tap action
            onDoubleTap();
            setShowHeart(true);

            // Hide heart animation after 800ms
            setTimeout(() => {
                setShowHeart(false);
            }, 800);

            tapCount.current = 0;
        }
    };

    return (
        <div
            className={`relative ${className || ''}`}
            onClick={handleTap}
            onTouchEnd={handleTap}
        >
            {children}

            {/* Heart animation on double tap */}
            {showHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <Heart className="text-primary w-16 h-16 animate-heart-pop" fill="currentColor" />
                </div>
            )}
        </div>
    );
}
