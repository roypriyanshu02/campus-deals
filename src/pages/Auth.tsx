import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroButton } from '@/components/ui/button-variants';

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigate('/products');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4 focus-ring rounded-md p-1 -m-1" aria-label="CampusDeals home">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold">CD</span>
            </div>
            <span className="font-bold text-2xl">CampusDeals</span>
          </Link>
          <p className="text-muted-foreground text-body">
            Your campus marketplace awaits
          </p>
        </div>

        <Card className="shadow-medium" id="main-content">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-body">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6" role="tablist">
                <TabsTrigger value="signin" role="tab" aria-selected="true">Sign In</TabsTrigger>
                <TabsTrigger value="signup" role="tab" aria-selected="false">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" role="tabpanel" aria-labelledby="signin-tab">
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Sign in form">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your university email"
                      required
                      className="focus-ring"
                      aria-describedby="email-help"
                    />
                    <p id="email-help" className="text-xs text-muted-foreground">Use your university email address</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="focus-ring"
                      aria-describedby="password-help"
                    />
                    <p id="password-help" className="text-xs text-muted-foreground">Enter your account password</p>
                  </div>
                  
                  <HeroButton 
                    type="submit" 
                    className="w-full touch-target focus-ring"
                    disabled={isLoading}
                    aria-describedby="signin-status"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </HeroButton>
                  <div id="signin-status" className="sr-only" aria-live="polite">
                    {isLoading ? 'Signing in...' : 'Ready to sign in'}
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">University Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="name@university.edu"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="campus">Campus</Label>
                    <Input
                      id="campus"
                      type="text"
                      placeholder="Your university name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                  
                  <HeroButton 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </HeroButton>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-primary transition-smooth"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;