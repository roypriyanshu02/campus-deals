import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./button";
import { forwardRef } from "react";

// Hero button variant for landing page
export const HeroButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-medium transition-smooth font-medium px-8 py-3.5 text-lg rounded-xl shadow-soft",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
HeroButton.displayName = "HeroButton";

// FAB (Floating Action Button) variant
export const FABButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-strong hover:shadow-medium hover:bg-primary/90 transition-smooth z-50 focus:ring-4 focus:ring-primary/20",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
FABButton.displayName = "FABButton";

// Desktop Action Button - A larger, more visible action button for desktop layouts
export const DesktopActionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "h-12 px-6 text-base font-medium rounded-md gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-smooth",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
DesktopActionButton.displayName = "DesktopActionButton";

// Category button variant
export const CategoryButton = forwardRef<HTMLButtonElement, ButtonProps & { active?: boolean }>(
  ({ className, children, active, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "transition-smooth touch-feedback",
          active
            ? "bg-primary text-primary-foreground border-primary shadow-soft"
            : "hover:bg-accent hover:text-accent-foreground border-muted",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
CategoryButton.displayName = "CategoryButton";

// Action button variant - for important actions
export const ActionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium rounded-lg py-2.5 px-5 font-medium transition-smooth touch-feedback",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
ActionButton.displayName = "ActionButton";