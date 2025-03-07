'use client';

import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/util';

const NavDropdownList = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>) => {
  return (
    <NavigationMenuPrimitive.Root
      className={cn(
        'z-10 flex max-w-max flex-1 items-center justify-center',
        className,
      )}
    >
      <NavigationMenuPrimitive.List
        className={cn(
          'group flex flex-1 list-none items-center justify-center space-x-1',
          className,
        )}
        {...props}
      >
        {children}
      </NavigationMenuPrimitive.List>
      <div className={cn('absolute left-0 top-full flex justify-center')}>
        <NavigationMenuPrimitive.Viewport className="origin-top-center relative left-10 top-0 mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border-on bg-popover shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

const NavDropdown = ({
  title,
  className,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Trigger
        className={cn(
          'group inline-flex h-8 w-max items-center justify-center rounded-md px-2 text-sm text-gray font-medium transition-colors hover:bg-gray hover:text-color focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
          className,
        )}
      >
        {title}
      </NavigationMenuPrimitive.Trigger>
      <NavigationMenuPrimitive.Content
        className={cn(
          'left-0 top-0 w-full md:absolute md:w-auto backdrop-blur-[800px] bg-opacity-10',
          'transition-all duration-[600ms] cubic-bezier(0.4, 0, 0.2, 1) data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight',
          className,
        )}
      >
        {children}
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Item>
  );
};

export { NavDropdownList, NavDropdown };
