import { useState, useEffect, RefObject } from 'react';

type UsePullToRefreshOptions = {
    onRefresh: () => Promise<void>;
    threshold?: number; // How many pixels to pull down before a refresh triggers
    containerRef: RefObject<HTMLDivElement>;
};

export function usePullToRefresh({ onRefresh, threshold = 100, containerRef }: UsePullToRefreshOptions) {
    const [isPulling, setIsPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        let touchStartY = 0;
        let touchY = 0;
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            if (container.scrollTop === 0) {
                touchStartY = e.touches[0].clientY;
                setIsPulling(true);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isPulling) return;
            touchY = e.touches[0].clientY;
            const distance = touchY - touchStartY;

            // Only allow pulling down, not up
            if (distance > 0) {
                // Apply some resistance to the pull
                const resistance = 0.4;
                setPullDistance(distance * resistance);
                e.preventDefault();
            }
        };

        const handleTouchEnd = async () => {
            if (pullDistance > threshold && !isRefreshing) {
                setIsRefreshing(true);
                try {
                    await onRefresh();
                } catch (error) {
                    console.error('Refresh failed', error);
                } finally {
                    setIsRefreshing(false);
                    setPullDistance(0);
                    setIsPulling(false);
                }
            } else {
                // Reset without refresh
                setPullDistance(0);
                setIsPulling(false);
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isPulling, pullDistance, isRefreshing, onRefresh, threshold, containerRef]);

    return {
        pullDistance,
        isRefreshing,
        refreshIndicatorStyle: {
            height: `${pullDistance}px`,
            transition: !isPulling ? 'height 0.2s ease-out' : undefined,
        },
    };
}
