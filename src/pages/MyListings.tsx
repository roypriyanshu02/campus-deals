import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { dummyUserListings } from '@/lib/dummy-data';
import { Plus, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyListings = () => {
  const [listings, setListings] = useState(dummyUserListings);

  const handleEdit = (id: string) => {
    console.log('Edit item:', id);
    // Navigate to edit page (not implemented in this MVP)
  };

  const handleDelete = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
    console.log('Deleted item:', id);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Listings</h1>
            <p className="text-muted-foreground">
              Manage your items for sale
            </p>
          </div>
          <Button asChild className="gradient-primary text-primary-foreground">
            <Link to="/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Link>
          </Button>
        </div>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start selling by adding your first item to the marketplace.
            </p>
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Listing
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {listings.length} item{listings.length !== 1 ? 's' : ''} listed
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listings.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MyListings;