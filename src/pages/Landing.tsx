import { Link } from 'react-router-dom';
import { HeroButton } from '@/components/ui/button-variants';
import { ShoppingBag, Users, Shield, Zap, ArrowRight, Star, BookOpen, Check, TrendingUp, Award, Clock, Heart, ChevronDown, Play, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

const Landing = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: ShoppingBag,
      title: 'Campus Marketplace',
      description: 'Buy and sell with fellow students and staff in your university community.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified members of your campus for safe and reliable transactions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Built-in safety features and community guidelines keep your trades secure.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Zap,
      title: 'Quick & Easy',
      description: 'List items in seconds and find what you need with smart search and filters.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students', icon: Users, color: 'text-primary' },
    { number: '200+', label: 'Partner Universities', icon: Award, color: 'text-secondary' },
    { number: '1M+', label: 'Items Sold', icon: TrendingUp, color: 'text-primary' },
    { number: '99%', label: 'Satisfaction Rate', icon: Heart, color: 'text-green-600' }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Computer Science Major",
      text: "I sold my old laptop and textbooks in just two days! The interface is so intuitive and the community is great."
    },
    {
      name: "Sarah Miller",
      role: "Biology Student",
      text: "Found my apartment furniture at half the retail price. CampusDeals saved me so much money as a new student!"
    },
    {
      name: "Marcus Lee",
      role: "Engineering Graduate",
      text: "When I graduated, I was able to sell everything I couldn't take with me. The process was seamless and secure."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container-responsive flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 focus-ring rounded-md p-1 -m-1"
            aria-label="CampusDeals home"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">CD</span>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">CampusDeals</span>
          </Link>

          <nav className="flex items-center space-x-4" role="navigation" aria-label="Main navigation">
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium focus-ring rounded-md px-3 py-2"
              aria-label="Sign in to your account"
            >
              Sign In
            </Link>
            <HeroButton asChild>
              <Link to="/auth" aria-label="Get started with CampusDeals" className="touch-target focus-ring">Get Started</Link>
            </HeroButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="main-content"
        className="relative overflow-hidden py-20 px-4 md:py-28 lg:py-36 space-section"
        aria-labelledby="hero-heading"
      >
        {/* Enhanced background with vibrant animated gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-purple-500/5 via-pink-500/5 to-secondary/8"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/12 via-purple-500/6 via-pink-500/6 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/4 via-transparent to-cyan-500/6"></div>
        </div>

        {/* Animated decorative elements with vibrant colors */}
        <div className="absolute hidden md:block -top-24 right-10 w-72 h-72 bg-gradient-to-br from-primary/8 to-purple-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute hidden md:block bottom-12 -left-20 w-80 h-80 bg-gradient-to-br from-secondary/8 to-pink-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute hidden lg:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/6 via-primary/4 to-purple-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute hidden xl:block top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-pink-500/6 to-secondary/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

        <div className="container-responsive text-center max-w-5xl">
          {/* Trust badge with enhanced animation */}
          <div className={`inline-flex items-center px-4 py-2 mb-8 border border-primary/20 bg-primary/5 rounded-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">Trusted by 50,000+ students</span>
            </div>
          </div>

          {/* Main heading with enhanced typography */}
          <h1 
            id="hero-heading"
            className={`text-display mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Your Campus
            <span className="bg-gradient-to-r from-primary via-secondary via-purple-500 via-pink-500 via-blue-500 via-cyan-500 to-primary bg-clip-text text-transparent animate-rainbow block sm:inline"> Marketplace</span>
          </h1>

          {/* Enhanced description */}
          <p className={`text-body text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Buy and sell textbooks, electronics, furniture, and more with your university community.
            <span className="block mt-2 text-lg font-medium text-foreground">Safe, local, and student-friendly.</span>
          </p>

          {/* Enhanced CTA buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <HeroButton asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 touch-target focus-ring">
              <Link to="/auth" aria-label="Start selling your items on CampusDeals">
                <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
                Start Selling
              </Link>
            </HeroButton>
            <Link
              to="/products"
              className="flex items-center text-primary hover:text-primary/80 font-medium transition-smooth group touch-target focus-ring rounded-md px-4 py-2"
              aria-label="Browse available items for sale"
            >
              <Play className="h-4 w-4 mr-2" aria-hidden="true" />
              Browse Items 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center text-muted-foreground animate-bounce">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-purple-50/20 via-pink-50/20 to-muted/30 space-section" aria-labelledby="features-heading">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-secondary/70 mr-2"></span>
              Features
              <span className="w-5 h-px bg-secondary/70 ml-2"></span>
            </div>
            <h2 id="features-heading" className="text-heading mb-4">
              Why Choose CampusDeals?
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              The most trusted marketplace for college communities across the country.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`text-center border-muted/50 shadow-soft hover:shadow-medium hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <CardContent className="p-6 pt-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ring-2 ring-white/20 group-hover:ring-white/40`}>
                    <feature.icon className="h-7 w-7 text-white drop-shadow-sm" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors" id={`feature-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors" aria-labelledby={`feature-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background via-blue-50/30 via-cyan-50/30 to-background space-section" aria-labelledby="how-it-works-heading">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-primary/70 mr-2"></span>
              Simple Process
              <span className="w-5 h-px bg-primary/70 ml-2"></span>
            </div>
            <h2 id="how-it-works-heading" className="text-heading mb-4">
              How CampusDeals Works
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start trading with your campus community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: BookOpen,
                title: "Create an Account",
                description: "Sign up with your university email to join your campus marketplace community",
                step: 1
              },
              {
                icon: ShoppingBag,
                title: "List or Browse",
                description: "Easily list items for sale or browse what's available from other students",
                step: 2
              },
              {
                icon: Users,
                title: "Connect & Trade",
                description: "Message other students and arrange to meet safely on campus to complete your trade",
                step: 3
              }
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/15 via-purple-500/10 to-primary/10 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 relative ring-2 ring-primary/20 group-hover:ring-primary/40">
                  <step.icon className="h-9 w-9 text-primary group-hover:text-primary/80 transition-colors drop-shadow-sm" aria-hidden="true" />
                  <div className="absolute -right-2 -top-2 bg-gradient-to-r from-primary to-purple-500 w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-lg ring-2 ring-white/30">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {step.description}
                </p>

                {/* Enhanced connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/20 group-hover:from-primary/50 group-hover:via-purple-500/30 group-hover:to-primary/30 transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/10 via-purple-50/30 via-pink-50/30 to-muted/10 space-section" aria-labelledby="stats-heading">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-12">
            <h2 id="stats-heading" className="text-heading mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who have already discovered the benefits of campus trading
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-background border border-muted/40 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-primary/15 via-purple-500/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-2 ring-primary/20 group-hover:ring-primary/40`}>
                    <stat.icon className={`h-6 w-6 ${stat.color} drop-shadow-sm`} aria-hidden="true" />
                  </div>
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <p className="text-lg font-medium group-hover:text-primary transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-blue-50/20 via-cyan-50/20 to-background space-section" aria-labelledby="testimonials-heading">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-secondary/70 mr-2"></span>
              Testimonials
              <span className="w-5 h-px bg-secondary/70 ml-2"></span>
            </div>
            <h2 id="testimonials-heading" className="text-heading mb-4">
              What Students Say
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Join the thousands of students who love using CampusDeals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-background border border-muted/50 rounded-xl p-6 shadow-soft hover:shadow-medium hover:border-primary/20 transition-all duration-300 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: `${index * 150}ms`}}
              >
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary fill-secondary group-hover:scale-110 transition-transform duration-200" style={{transitionDelay: `${i * 50}ms`}} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="group-hover:text-foreground transition-colors">
                  <p className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <footer className="pt-2 border-t border-muted/30">
                    <p className="font-semibold group-hover:text-primary transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{testimonial.role}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden space-section" aria-labelledby="cta-heading">
        {/* Enhanced background with vibrant animated elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 gradient-hero"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-purple-500/10 via-pink-500/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/25 via-purple-500/15 via-pink-500/15 to-secondary/25"></div>
        </div>

        {/* Animated background elements with vibrant colors */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/8 to-purple-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-secondary/8 to-pink-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="container-responsive text-center max-w-4xl relative z-10">
          <div className="bg-background/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <h2 id="cta-heading" className="text-heading text-primary-foreground mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-body text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using CampusDeals to buy and sell with your campus community.
            </p>
            
            {/* Enhanced benefits list */}
            <div className="grid sm:grid-cols-3 gap-4 md:gap-8 mb-10">
              {[
                { icon: Check, text: "Free to join", delay: "0ms" },
                { icon: Check, text: "No commission fees", delay: "100ms" },
                { icon: Check, text: "Verified campus users", delay: "200ms" }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-center text-primary-foreground/90 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{transitionDelay: benefit.delay}}
                >
                  <benefit.icon className="h-5 w-5 mr-2 text-primary-foreground group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
            
            <HeroButton
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 shadow-xl hover:shadow-2xl touch-target focus-ring"
            >
              <Link to="/auth" aria-label="Create your CampusDeals account">
                <Sparkles className="h-5 w-5 mr-2" aria-hidden="true" />
                Create Your Account
              </Link>
            </HeroButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-gradient-to-br from-muted/10 via-purple-50/20 via-pink-50/20 to-muted/10" role="contentinfo">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 mb-8 border-b border-muted/50">
            <Link 
              to="/" 
              className="flex items-center space-x-2.5 mb-6 md:mb-0 focus-ring rounded-md p-1 -m-1"
              aria-label="CampusDeals home"
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm">CD</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">CampusDeals</span>
            </Link>

            <nav className="flex flex-wrap gap-8" role="navigation" aria-label="Footer navigation">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Platform</h4>
                <ul className="space-y-2" role="list">
                  <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Browse</Link></li>
                  <li><Link to="/products/new" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Sell Items</Link></li>
                  <li><Link to="/messages" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Messages</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Support</h4>
                <ul className="space-y-2" role="list">
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Help Center</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Safety Tips</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Legal</h4>
                <ul className="space-y-2" role="list">
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Terms of Service</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md px-1 py-1 -mx-1">Community Guidelines</Link></li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm order-2 md:order-1">
              © 2025 CampusDeals. Making campus trading simple and secure.
            </p>
            <div className="flex space-x-4 order-1 md:order-2" role="list" aria-label="Social media links">
              <a 
                href="#" 
                aria-label="Follow CampusDeals on Instagram" 
                className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md p-2 -m-2 touch-target"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a 
                href="#" 
                aria-label="Follow CampusDeals on Twitter" 
                className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md p-2 -m-2 touch-target"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a 
                href="#" 
                aria-label="Follow CampusDeals on Facebook" 
                className="text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md p-2 -m-2 touch-target"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;