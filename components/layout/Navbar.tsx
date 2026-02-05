'use client';

import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// Remove the static import and only keep the dynamic one
const LocaleSwitcher = dynamic(() => import('@/components/localization/LocaleSwitcher'), {
  ssr: false,
  loading: () => <div className="w-[120px] h-10 border rounded-md animate-pulse bg-gray-100" />
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path: string) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(/^\/(en|th)/, '') || '/';
    return pathWithoutLocale === path;
  };

  return (
    <div className="w-full bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5">
        <nav className="flex justify-between items-center">
          <Link href="/" className="logo flex items-center space-x-2">
            <Image src="/logo.jpg" width={32} height={32} alt="logo" />
            <p className="text-lg md:text-xl font-bold">MaharThai</p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    href="/" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/') && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('home')}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    href="/services" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/services') && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('services')}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    href="/about" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/about') && "bg-accent text-accent-foreground"
                    )}
                  >
                    {t('about')}
                  </Link>
                </NavigationMenuItem>

                {/* Log In / Sign Up */}
                <NavigationMenuItem>
                  <Link
                    href="/login"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition text-sm"
                  >
                    {t('login')}
                  </Link>
                </NavigationMenuItem>

                <div className="ms-1">
                  <NavigationMenuItem>
                    <Link
                      href="/signup"
                      className="bg-slate-100 text-secondary px-4 py-2 rounded-md hover:bg-slate-100/90 transition text-sm"
                    >
                      {t('signup')}
                    </Link>
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Locale Switcher */}
            <LocaleSwitcher />
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Mobile Menu Drawer */}
          <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;