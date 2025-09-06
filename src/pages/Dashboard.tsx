import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { dummyUser, dummyUserListings, dummyChatThreads, dummyReviews } from '@/lib/dummy-data';
import { User, Package, MessageCircle, Edit, Calendar, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userReviews = dummyReviews.filter(r => r.sellerId === dummyUser.id);

  const stats = [
    {
      title: 'Items Listed',
      value: dummyUserListings.length,
      icon: Package,
      description: 'Active listings'
    },
    {
      title: 'Active Chats',
      value: dummyChatThreads.length,
      icon: MessageCircle,
      description: 'Conversations'
    },
    {
      title: 'Seller Rating',
      value: dummyUser.rating.toFixed(1),
      icon: Star,
      description: `${dummyUser.reviewCount} reviews`
    },
    {
      title: 'Member Since',
      value: new Date(dummyUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      icon: Calendar,
      description: dummyUser.role.charAt(0).toUpperCase() + dummyUser.role.slice(1)
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Profile Header */}
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                <AvatarFallback className="text-xl">
                  {dummyUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{dummyUser.name}</h1>
                <p className="text-muted-foreground mb-2">{dummyUser.email}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{dummyUser.campus}</Badge>
                  <Badge variant="secondary">{dummyUser.role}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{dummyUser.rating}</span>
                  <span className="text-muted-foreground">({dummyUser.reviewCount} reviews)</span>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link to="/settings">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/products/new">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">Sell Item</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/my-listings">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Listings</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/wishlist">
                  <Heart className="h-6 w-6 mb-2" />
                  <span className="text-sm">Wishlist</span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/messages">
                  <MessageCircle className="h-6 w-6 mb-2" />
                  <span className="text-sm">Messages</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Listings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Listings
                <Link to="/my-listings" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummyUserListings.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.condition}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Messages
                <Link to="/messages" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummyChatThreads.slice(0, 2).map((thread) => (
                <div key={thread.id} className="flex items-center space-x-3">
                  <img
                    src={thread.product.image}
                    alt={thread.product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{thread.sellerName}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {thread.lastMessage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(thread.lastMessageTime).toLocaleDateString()}
                    </p>
                    {thread.unreadCount > 0 && (
                      <Badge variant="default" className="text-xs mt-1">
                        {thread.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;