import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyProducts, dummyReviews } from '@/lib/dummy-data';
import { ArrowLeft, Star, Phone, MapPin, MessageCircle, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

// Simple SellerProfile skeleton component for loading state
const SellerProfileSkeleton = () => (
    <div className="space-y-6">
        <div className="flex gap-4 items-center">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>

        <Skeleton className="h-12 w-full" />

        <div className="space-y-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        </div>
    </div>
);

const SellerProfile = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Find seller-related data based on sellerId
    const sellerProducts = dummyProducts.filter(p => p.sellerId === sellerId);
    const firstProduct = sellerProducts.length > 0 ? sellerProducts[0] : null;
    const sellerName = firstProduct ? firstProduct.sellerName : 'Unknown Seller';
    const sellerReviews = dummyReviews.filter(r => r.sellerId === sellerId);

    // Calculate average rating
    const averageRating = sellerReviews.length > 0
        ? sellerReviews.reduce((sum, review) => sum + review.rating, 0) / sellerReviews.length
        : 0;

    // Simulate loading state
    useEffect(() => {
        // Simulate network delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="container-responsive max-w-6xl">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-6 -ml-2 touch-target focus-ring"
                        aria-label="Go back to previous page"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                        Back
                    </Button>
                    <SellerProfileSkeleton />
                </div>
            </Layout>
        );
    }

    if (!firstProduct) {
        return (
            <Layout>
                <div className="container-responsive max-w-6xl">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-6 -ml-2 touch-target focus-ring"
                        aria-label="Go back to previous page"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                        Back
                    </Button>
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            We couldn't find the seller you're looking for.
                        </p>
                        <Button onClick={() => navigate('/products')}>
                            Browse Products
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    // Define joining date - for demo purposes using a static date
    const joiningDate = new Date('2023-08-01').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    // Handle contact seller
    const handleContactSeller = () => {
        console.log('Starting chat with seller:', sellerId);
        navigate('/messages');
    };

    // Handle call seller
    const handleCallSeller = () => {
        console.log('Calling seller:', sellerId);
    };

    return (
        <Layout>
            <div className="container-responsive max-w-6xl">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 -ml-2 touch-target focus-ring"
                    aria-label="Go back to previous page"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                    Back
                </Button>

                {/* Seller Profile Card */}
                <Card className="mb-8">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <Avatar className="h-20 w-20 md:h-28 md:w-28">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sellerId}`} />
                                    <AvatarFallback>{sellerName[0]}</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Profile Information */}
                            <div className="flex-grow space-y-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{sellerName}</h1>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <Badge variant="outline" className="text-sm">Student</Badge>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5 mr-1" />
                                            IIT Delhi
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5 mr-1" />
                                            Joined {joiningDate}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    {sellerReviews.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.round(averageRating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">{averageRating.toFixed(1)}</span>
                                            <span className="text-sm text-muted-foreground">
                                                ({sellerReviews.length} reviews)
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Seller Bio */}
                                <p className="text-muted-foreground">
                                    Computer Science student passionate about technology and sustainability.
                                    Selling textbooks, electronics, and other items to help fellow students
                                    save money and reduce waste.
                                </p>

                                {/* Contact Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleContactSeller}
                                        className="flex items-center gap-2"
                                        size="sm"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Message
                                    </Button>
                                    <Button
                                        onClick={handleCallSeller}
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        size="sm"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Call
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs for Listings and Reviews */}
                <Tabs defaultValue="listings" className="mb-12">
                    <TabsList className="mb-6">
                        <TabsTrigger value="listings">Listings ({sellerProducts.length})</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews ({sellerReviews.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="listings">
                        {sellerProducts.length === 0 ? (
                            <div className="text-center py-12 bg-muted/20 rounded-lg">
                                <h3 className="text-xl font-medium mb-2">No Listings Yet</h3>
                                <p className="text-muted-foreground">This seller doesn't have any active listings right now.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {sellerProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="reviews">
                        {sellerReviews.length === 0 ? (
                            <div className="text-center py-12 bg-muted/20 rounded-lg">
                                <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
                                <p className="text-muted-foreground">This seller hasn't received any reviews yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sellerReviews.map(review => (
                                    <Card key={review.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="text-xs">U</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium text-sm">User {review.buyerId}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < review.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default SellerProfile;
