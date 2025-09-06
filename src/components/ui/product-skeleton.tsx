import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({
    className,
    style
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <Card
            className={cn("overflow-hidden h-full flex flex-col border shadow-soft", className)}
            style={style}
        >
            <div className="aspect-square overflow-hidden relative">
                <Skeleton className="h-full w-full loading-shimmer" />
                {/* Badge skeleton */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>
                {/* Heart icon skeleton */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>

            <CardContent className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col space-y-2 sm:space-y-3">
                {/* Title */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Price and category */}
                <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-6 w-20 bg-primary/10" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                </div>

                {/* Date and seller */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-24" />
                    <div className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ProductGridSkeleton({
    count = 12,
    className
}: {
    count?: number;
    className?: string;
}) {
    return (
        <div className={cn(
            "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6",
            className
        )}>
            {Array(count).fill(0).map((_, i) => (
                <ProductCardSkeleton
                    key={i}
                    className="animate-fade-in-up"
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        animationFillMode: 'both'
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
