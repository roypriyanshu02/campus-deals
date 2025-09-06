import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RefreshIndicatorProps {
    pullDistance: number;
    threshold: number;
    isRefreshing: boolean;
    style?: React.CSSProperties;
}

export function RefreshIndicator({
    pullDistance,
    threshold,
    isRefreshing,
    style
}: RefreshIndicatorProps) {
    const progress = Math.min(pullDistance / threshold, 1);
    const rotation = progress * 360;

    return (
        <div
            className="flex items-center justify-center bg-background/50 backdrop-blur-sm"
            style={style}
        >
            {isRefreshing ? (
                <RefreshCcw className="h-6 w-6 text-primary animate-spin" />
            ) : (
                <RefreshCcw
                    className={cn(
                        "h-6 w-6 transition-all",
                        pullDistance >= threshold ? "text-primary" : "text-muted-foreground"
                    )}
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            )}
        </div>
    );
}
