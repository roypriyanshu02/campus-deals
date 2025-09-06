import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, Package, Home, Plus, MessageCircle, Search, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DesktopSidebar } from './ui/desktop-sidebar';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showHeader?: boolean;
  showSearch?: boolean;
}

export const Layout = ({
  children,
  showBottomNav = true,
  showHeader = true,
  showSearch = false
}: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMessageAlert, setShowMessageAlert] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        if (window.scrollY > 300) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      } else {
        setIsScrolled(false);
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/products' },
    { icon: Plus, label: 'Sell Item', path: '/products/new' },
    { icon: Package, label: 'My Items', path: '/my-listings' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/dashboard' }, // Using the current user's ID
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {showHeader && (
        <header className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-medium supports-[backdrop-filter]:bg-background/90 transition-shadow duration-300",
          isScrolled ? "shadow-medium border-border/80" : "shadow-soft border-border/40"
        )} role="banner">
          <div className="container-responsive flex h-14 sm:h-16 items-center justify-between gap-3 sm:gap-4">
            {/* Brand Section */}
            <div className="flex items-center min-w-0">
              <Link
                to="/"
                className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8 focus-ring rounded-lg p-1.5 sm:p-2 -m-1.5 sm:-m-2 transition-smooth hover:bg-muted/50"
                aria-label="CampusDeals home"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-gradient flex items-center justify-center shadow-soft hover:shadow-medium transition-shadow">
                  <span className="text-primary-foreground font-bold text-xs sm:text-sm">CD</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-base sm:text-lg leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    CampusDeals
                  </span>
                  <span className="text-xs text-muted-foreground font-medium hidden lg:block">
                    Student Marketplace
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              {!isMobile && (
                <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                  <Link
                    to="/products"
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth focus-ring rounded-lg px-3 xl:px-4 py-2 xl:py-2.5"
                    aria-label="Browse products"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/products/new"
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth focus-ring rounded-lg px-3 xl:px-4 py-2 xl:py-2.5"
                    aria-label="Sell an item"
                  >
                    Sell
                  </Link>
                </nav>
              )}
            </div>

            {/* Search Section */}
            {showSearch && !isMobile && (
              <div className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-4 lg:mx-6">
                <div className="relative group">
                  <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors z-10" aria-hidden="true" />
                  <Input
                    placeholder="Search textbooks, electronics, furniture..."
                    className="pl-10 lg:pl-11 pr-4 h-10 lg:h-11 rounded-xl border-input bg-muted/40 hover:bg-muted/60 focus:bg-background focus:border-primary/40 transition-smooth text-sm w-full"
                    aria-label="Search products"
                    role="searchbox"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs text-muted-foreground bg-background border rounded-md hidden xl:inline-block">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
            )}

            {/* User Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notifications Button - Desktop Only */}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl h-9 w-9 lg:h-10 lg:w-10 p-0 hover:bg-muted/60 transition-smooth relative touch-target"
                  aria-label="Notifications"
                >
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
              )}

              {/* Profile Button */}
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-xl h-9 w-9 sm:h-10 sm:w-auto px-2 sm:px-3 hover:bg-muted/60 transition-smooth touch-target gap-1.5 sm:gap-2.5"
              >
                <Link to="/dashboard" aria-label="Go to your profile" className="flex items-center">
                  <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-lg bg-primary/10 hover:bg-primary/15 transition-colors">
                    <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="hidden sm:inline xl:inline text-sm font-medium text-foreground">Profile</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {showHeader && !isMobile && <DesktopSidebar />}

        <main
          id="main-content"
          className={cn(
            "flex-1 transition-all duration-300",
            showBottomNav && "pb-20 lg:pb-0",
            !isMobile && "px-4 sm:px-6 py-4 sm:py-6 lg:px-8 lg:py-8"
          )}
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>

      {showBottomNav && isMobile && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-medium supports-[backdrop-filter]:bg-background/90 border-t border-border/60 shadow-strong"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="grid h-18 sm:h-20 max-w-lg mx-auto grid-cols-6 px-1 sm:px-2">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "inline-flex flex-col items-center justify-center px-1.5 sm:px-2 py-2 sm:py-3 text-xs transition-smooth touch-feedback focus-ring rounded-xl m-0.5 sm:m-1 relative",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={label}
                >
                  <div className={cn(
                    "flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-colors mb-0.5 sm:mb-1",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}>
                    <Icon
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                    {/* Message notification badge */}
                    {path === '/messages' && (
                      <span className="absolute top-0.5 sm:top-1 right-3 sm:right-4 h-2 w-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs leading-tight font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Desktop notifications banner */}
      {showMessageAlert && !isMobile && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-40" style={{ left: "calc(var(--sidebar-width, 72px) + 1.5rem)" }}>
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border border-border/60 rounded-xl p-4 shadow-medium max-w-md mx-auto">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">New messages</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You have 2 unread messages from sellers</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground rounded-md -mt-1"
                onClick={() => setShowMessageAlert(false)}
                aria-label="Dismiss notification"
              >
                ×
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" variant="default" className="h-8 px-3 text-xs rounded-lg" asChild>
                <Link to="/messages">View Messages</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Back to top button on mobile */}
      {isMobile && showScrollTop && (
        <Button
          size="icon"
          variant="secondary"
          className="fixed bottom-24 right-4 z-40 rounded-full shadow-strong h-12 w-12 hover:shadow-medium transition-shadow"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};