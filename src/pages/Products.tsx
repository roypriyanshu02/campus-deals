import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryButton, FABButton } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { dummyProducts, CATEGORIES } from '@/lib/dummy-data';
import { Search, Plus, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { RefreshIndicator } from '@/components/ui/refresh-indicator';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Initialize pull-to-refresh
  const { pullDistance, isRefreshing, refreshIndicatorStyle } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
    containerRef
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout showSearch={true}>
      <div ref={containerRef} className="container-responsive space-y-4 sm:space-y-6 md:space-y-7 max-w-6xl overflow-auto min-h-[calc(100vh-3.5rem)]">
        {isMobile && (
          <RefreshIndicator
            pullDistance={pullDistance}
            threshold={80}
            isRefreshing={isRefreshing}
            style={refreshIndicatorStyle}
          />
        )}
        {/* Mobile Search Bar */}
        <div className="relative md:hidden">
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
              <Input
                placeholder="Search for textbooks, electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 h-10 sm:h-11 rounded-lg shadow-soft focus-ring input-enhanced"
                aria-label="Search products"
                role="searchbox"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 touch-feedback focus-ring rounded-md"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn("h-11 w-11 rounded-lg shadow-soft touch-target focus-ring",
                showFilters && "bg-primary/10 border-primary/20")}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className={cn("space-y-4", isMobile && !showFilters && "hidden")}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl">Categories</h2>
            <p className="text-sm text-muted-foreground hidden md:block" aria-live="polite">
              {!isLoading && `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-3 md:flex-wrap scrollbar-hide" role="tablist" aria-label="Product categories">
            <CategoryButton
              active={!selectedCategory}
              onClick={() => setSelectedCategory('')}
              className="px-5 py-2 rounded-lg shadow-soft touch-target focus-ring"
              aria-pressed={!selectedCategory}
              role="tab"
              aria-selected={!selectedCategory}
            >
              All
            </CategoryButton>
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap px-5 py-2 rounded-lg shadow-soft touch-target focus-ring"
                aria-pressed={selectedCategory === category}
                role="tab"
                aria-selected={selectedCategory === category}
              >
                {category}
              </CategoryButton>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl text-primary">
              {selectedCategory ? `${selectedCategory} Items` : 'All Items'}
            </h2>
            <p className="text-sm text-muted-foreground md:hidden bg-muted/50 px-3 py-1 rounded-full" aria-live="polite">
              {!isLoading && `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl shadow-soft">
              <p className="text-muted-foreground mb-6">No items found matching your criteria</p>
              <Link to="/products/new">
                <CategoryButton className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 touch-target focus-ring">
                  Be the first to list something!
                </CategoryButton>
              </Link>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              role="grid"
              aria-label="Product listings"
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button - Only show on mobile */}
      <FABButton asChild className="lg:hidden shadow-strong">
        <Link to="/products/new" aria-label="Add new product">
          <Plus className="h-6 w-6" />
        </Link>
      </FABButton>
    </Layout>
  );
};

export default Products;