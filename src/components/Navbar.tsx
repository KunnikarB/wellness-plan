'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import {
  DumbbellIcon,
  HomeIcon,
  UserIcon,
  ZapIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Consider 768px as the medium breakpoint
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <ZapIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono">
            FIT<span className="text-primary">&</span>FIRM
          </span>
        </Link>

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        )}

        {/* NAVIGATION */}
        <nav
          className={`${
            isDesktop
              ? 'flex items-center gap-5'
              : 'absolute top-full left-0 right-0 bg-background/90 backdrop-blur-md py-4 space-y-3 text-center'
          } ${isMobileMenuOpen ? 'flex flex-col' : isDesktop ? 'flex' : 'hidden'}`} // Adjusted for desktop
        >
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link
                href="/generate-program"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
              >
                <DumbbellIcon size={16} />
                <span>Generate</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </Link>
              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
              >
                <Link
                  href="/generate-program"
                  onClick={() => !isDesktop && setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </Button>
              <div className="md:ml-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant={'outline'}
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
