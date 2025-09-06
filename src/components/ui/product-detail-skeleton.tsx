import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="grid grid-cols-4 gap-2">
                        {Array(4).fill(0).map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-md" />
                        ))}
                    </div>
                </div>

                {/* Product Details Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>

                    <Skeleton className="h-24 w-full" />

                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>

                    <div className="space-y-2 mt-6">
                        <Skeleton className="h-5 w-32" />
                        <Card className="p-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
