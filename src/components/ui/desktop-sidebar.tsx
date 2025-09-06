import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Package, Home, Plus, MessageCircle, ChevronRight, HelpCircle, Settings } from 'lucide-react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
}

export function DesktopSidebar({ className, collapsed: propCollapsed }: SidebarProps) {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(propCollapsed || false);

    const navItems = [
        { icon: Home, label: 'Home', path: '/products' },
        { icon: Plus, label: 'Sell Item', path: '/products/new' },
        { icon: Package, label: 'My Items', path: '/my-listings' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: MessageCircle, label: 'Messages', path: '/messages' },
        { icon: Settings, label: 'My Profile', path: '/dashboard' }, // Using the current user's ID
    ];

    return (
        <div
            className={cn(
                "hidden lg:flex flex-col border-r h-[calc(100vh-3.5rem)] bg-sidebar sticky top-14 transition-all duration-300 shadow-sm",
                collapsed ? "w-16 xl:w-[72px]" : "w-56 xl:w-64 2xl:w-72",
                className
            )}
            style={{
                "--sidebar-width": collapsed ? (typeof window !== 'undefined' && window.innerWidth >= 1280 ? "72px" : "64px") : (typeof window !== 'undefined' && window.innerWidth >= 1536 ? "288px" : typeof window !== 'undefined' && window.innerWidth >= 1280 ? "256px" : "224px")
            } as React.CSSProperties}>
            <div className={cn(collapsed ? "p-2 xl:p-3" : "p-3 xl:p-4", "flex flex-col items-center lg:items-stretch")}>
                <div className={cn("flex items-center justify-end mb-4 xl:mb-6", collapsed && "w-full")}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("h-7 w-7 xl:h-8 xl:w-8 p-0 rounded-full hover:bg-sidebar-accent transition-colors", collapsed && "mx-auto")}
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronRight className={cn(
                            "h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform",
                            collapsed && "rotate-180"
                        )} />
                    </Button>
                </div>
                <nav className={cn(
                    "flex flex-col w-full",
                    collapsed ? "items-center space-y-2 xl:space-y-3" : "space-y-1"
                )} role="navigation" aria-label="Sidebar navigation">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path;
                        const isPending = location.pathname.startsWith(path) && path !== '/products';
                        const isHighlighted = isActive || isPending;

                        const navLink = (
                            <Link
                                key={path}
                                to={path}
                                className={cn(
                                    "flex items-center rounded-lg transition-all duration-200 relative overflow-hidden group focus-ring",
                                    collapsed ? "w-10 h-10 xl:w-11 xl:h-11 justify-center mx-auto" : "px-2.5 xl:px-3 py-2 xl:py-2.5 gap-2.5 xl:gap-3",
                                    isHighlighted
                                        ? "bg-sidebar-primary/10 text-sidebar-primary font-medium shadow-soft"
                                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {isActive && !collapsed && (
                                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-sidebar-primary rounded-r-full" />
                                )}
                                <div className={cn(
                                    "flex items-center justify-center transition-colors",
                                    collapsed ? "w-5 h-5 xl:w-6 xl:h-6" : "w-5 h-5",
                                    isHighlighted && collapsed && "bg-sidebar-primary/15 rounded-lg p-1"
                                )}>
                                    <Icon className={cn("h-4 w-4 xl:h-[18px] xl:w-[18px]",
                                        isHighlighted ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                                    )} />
                                </div>
                                {!collapsed && (
                                    <span className={cn(
                                        "text-xs xl:text-sm truncate",
                                        isHighlighted ? "font-medium text-sidebar-primary" : "font-normal group-hover:text-sidebar-foreground"
                                    )}>{label}</span>
                                )}
                            </Link>
                        );

                        return collapsed ? (
                            <TooltipProvider key={path} delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {navLink}
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-popover border shadow-medium">
                                        <span className="text-xs font-medium">{label}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : navLink;
                    })}

                    {!collapsed && (
                        <div className="mt-4 xl:mt-6 pt-3 xl:pt-4 border-t border-sidebar-border/50">
                            <h4 className="text-[10px] xl:text-xs text-sidebar-foreground/50 font-medium px-2.5 xl:px-3 mb-2 uppercase tracking-wider">Quick Links</h4>
                            <div className="space-y-0.5 xl:space-y-1">
                                <Link
                                    to="/help"
                                    className="flex items-center rounded-lg transition-all duration-200 relative overflow-hidden group px-2.5 xl:px-3 py-1.5 xl:py-2 gap-2.5 xl:gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-ring"
                                >
                                    <div className="flex items-center justify-center">
                                        <HelpCircle className="h-3.5 w-3.5 xl:h-[16px] xl:w-[16px] text-sidebar-foreground/60 group-hover:text-sidebar-foreground" />
                                    </div>
                                    <span className="text-xs font-normal group-hover:text-sidebar-foreground">Help</span>
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center rounded-lg transition-all duration-200 relative overflow-hidden group px-2.5 xl:px-3 py-1.5 xl:py-2 gap-2.5 xl:gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground focus-ring"
                                >
                                    <div className="flex items-center justify-center">
                                        <Settings className="h-3.5 w-3.5 xl:h-[16px] xl:w-[16px] text-sidebar-foreground/60 group-hover:text-sidebar-foreground" />
                                    </div>
                                    <span className="text-xs font-normal group-hover:text-sidebar-foreground">Settings</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            <div className={cn(
                "mt-auto p-3 xl:p-4 border-t border-sidebar-border/30 text-center text-xs text-sidebar-foreground/50",
                collapsed && "px-2"
            )}>
                {collapsed ? (
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 xl:w-6 xl:h-6 rounded-lg bg-sidebar-primary/10 flex items-center justify-center">
                            <span className="text-[10px] xl:text-xs text-sidebar-primary font-bold">CD</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1 xl:space-y-1.5">
                        <div className="flex items-center justify-center gap-1.5 xl:gap-2">
                            <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-lg bg-sidebar-primary/10 flex items-center justify-center">
                                <span className="text-[8px] xl:text-[10px] text-sidebar-primary font-bold">CD</span>
                            </div>
                            <span className="text-xs xl:text-sm font-semibold text-sidebar-foreground">CampusDeals</span>
                        </div>
                        <p className="text-[10px] xl:text-xs text-sidebar-foreground/40">© {new Date().getFullYear()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
