import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dummyProducts, dummyReviews } from '@/lib/dummy-data';
import { ArrowLeft, MessageCircle, Heart, Phone, Star, MapPin, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { ProductDetailSkeleton } from '@/components/ui/product-detail-skeleton';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const product = dummyProducts.find(p => p.id === id);
  const sellerReviews = dummyReviews.filter(r => r.sellerId === product?.sellerId);

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
      <Layout showBottomNav={false}>
        <ProductDetailSkeleton />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', product.id);
  };

  const handleContact = () => {
    console.log('Starting chat with seller:', product.sellerId);
    navigate('/messages');
  };

  const handleCall = () => {
    console.log('Calling seller:', product.sellerId);
  };

  const averageRating = sellerReviews.length > 0
    ? sellerReviews.reduce((sum, review) => sum + review.rating, 0) / sellerReviews.length
    : 0;

  return (
    <Layout showBottomNav={false}>
      <div className="container-responsive space-y-6 max-w-6xl">
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

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Product Image */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Use our new ImageCarousel component */}
            <ImageCarousel
              images={[product.image, ...Array(3).fill(product.image)]}
              alt={`${product.title} - Product images`}
              className="aspect-square rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:py-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {product.title}
                </h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="rounded-full h-10 w-10 p-0 touch-target focus-ring"
                    aria-label="Share this product"
                    aria-expanded={showShareOptions}
                  >
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWishlist}
                    className="rounded-full h-10 w-10 p-0 touch-target focus-ring"
                    aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
                    aria-pressed={isWishlisted}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isWishlisted && "fill-primary text-primary"
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>

              {showShareOptions && (
                <div className="bg-muted/20 p-3 rounded-lg mb-3 animate-in fade-in slide-in-from-top-5 duration-200" role="region" aria-label="Share options">
                  <p className="text-sm mb-2">Share this product</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="h-9 touch-target focus-ring" aria-label="Copy product link">Copy Link</Button>
                    <Button size="sm" variant="secondary" className="h-9 touch-target focus-ring" aria-label="Share via WhatsApp">WhatsApp</Button>
                    <Button size="sm" variant="secondary" className="h-9 touch-target focus-ring" aria-label="Share via email">Email</Button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" aria-label={`Category: ${product.category}`}>{product.category}</Badge>
                <Badge variant="outline" aria-label={`Condition: ${product.condition}`}>{product.condition}</Badge>
              </div>

              <p className="text-3xl font-bold text-primary mb-4" aria-label={`Price: ₹${product.price}`}>
                ₹{product.price}
              </p>
            </div>

            {/* Seller Info */}
            <Card className="lg:hover:shadow-md lg:transition-all">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <Avatar
                      className="h-10 w-10 lg:h-14 lg:w-14 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                      onClick={() => navigate(`/seller/${product.sellerId}`)}
                    >
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.sellerId}`} />
                      <AvatarFallback>{product.sellerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p
                        className="font-medium lg:text-lg cursor-pointer hover:text-primary transition-colors"
                        onClick={() => navigate(`/seller/${product.sellerId}`)}
                      >
                        {product.sellerName}
                      </p>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">Student</Badge>
                          <MapPin className="h-3 w-3" />
                          IIT Delhi
                        </p>
                        {sellerReviews.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 lg:mt-0">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{averageRating.toFixed(1)}</span>
                            <span
                              className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                              onClick={() => navigate(`/seller/${product.sellerId}`)}
                            >
                              ({sellerReviews.length} reviews)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/seller/${product.sellerId}`)}
                    className="hidden lg:inline-flex"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="lg:bg-muted/20 lg:p-6 lg:rounded-lg">
              <h3 className="font-semibold mb-2 lg:mb-4 lg:text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed lg:text-base">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <Button
                onClick={handleContact}
                variant="outline"
                className="flex items-center gap-2 h-12 lg:text-base touch-target focus-ring"
                size="lg"
                aria-label="Send message to seller"
              >
                <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                Message
              </Button>
              <Button
                onClick={handleCall}
                className="bg-primary-solid text-primary-foreground hover:bg-primary-light flex items-center gap-2 h-12 lg:text-base touch-target focus-ring"
                size="lg"
                aria-label="Call seller"
              >
                <Phone className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                Call Seller
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-4 lg:p-6 space-y-2">
                <h3 className="font-semibold mb-3 lg:mb-4 lg:text-lg">Item Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm lg:text-base">
                  <div className="p-2 lg:p-3 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground block mb-1">Condition</span>
                    <span className="font-medium capitalize">{product.condition}</span>
                  </div>
                  <div className="p-2 lg:p-3 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground block mb-1">Listed</span>
                    <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="p-2 lg:p-3 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground block mb-1">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="p-2 lg:p-3 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground block mb-1">ID</span>
                    <span className="font-medium">#{product.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Reviews */}
            {sellerReviews.length > 0 && (
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold lg:text-lg">Seller Reviews</h3>
                    {sellerReviews.length > 3 && (
                      <Button variant="link" size="sm" className="text-primary">
                        View all reviews
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {sellerReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0 lg:hover:bg-muted/20 lg:p-3 lg:rounded-md lg:-mx-3 lg:transition-colors">
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;