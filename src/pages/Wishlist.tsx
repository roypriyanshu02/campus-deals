import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dummyProducts, dummyWishlistItems } from '@/lib/dummy-data';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(dummyWishlistItems);

  const wishlistProducts = wishlistItems.map(item => {
    const product = dummyProducts.find(p => p.id === item.productId);
    return product ? { ...product, addedDate: item.addedDate } : null;
  }).filter(Boolean);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.productId !== productId));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding items to your wishlist to save them for later!
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-4">
              {wishlistProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <Link to={`/products/${product.id}`} className="flex-1 flex">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover"
                        />
                        <div className="p-4 flex-1">
                          <h3 className="font-medium line-clamp-2 text-sm mb-2">
                            {product.title}
                          </h3>
                          <p className="text-lg font-bold text-primary mb-1">
                            ₹{product.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Added {new Date(product.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                      <div className="p-4 flex flex-col justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;