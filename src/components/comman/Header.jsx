"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
  Package,
  MapPin,
  ShoppingCartIcon, // Added for menu items
} from "lucide-react";

// SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { openLoginModal, setNavigation } from "@/redux/features/uiSlice";
import Cookies from "js-cookie";

// --- Navigation Data Structure (Centralized and Nested) ---
const userMenuItems = [
  { label: "My Profile", icon: UserIcon, href: "/profile?tab=account" },
  { label: "My Orders", icon: Package, href: "/profile?tab=orders" },
  { label: "Account Settings", icon: Settings, href: "/profile?tab=settings" },
  {
    label: "Addresses",
    icon: MapPin,
    href: "/profile?tab=account",
  },
];

// --- Component ---
export default function Header({ navigationData }) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.totalQuantity);

  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.details);
  const logo = useSelector((state) => state.logo.logo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn || Cookies.get("loginModal")) {
      return;
    } else {
      setTimeout(() => {
        dispatch(openLoginModal(true));
        Cookies.set("loginModal", true, { expires: 1 });
      }, 10000);
      return;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(setNavigation(navigationData));
  }, [navigationData]);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MobileLink = ({ name, href }) => (
    <SheetClose asChild>
      <Link href={href}>
        <Button
          variant="ghost"
          className="w-full justify-start py-3 px-4 text-gray-900 hover:bg-amber-50 rounded-lg font-medium h-auto"
        >
          {name}
        </Button>
      </Link>
    </SheetClose>
  );

  const renderMobileNav = () => (
    <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
      {navigationData._data.map((cat, idx) => (
        <div key={idx}>
          {cat.subCategories?.length == 0 ? (
            <MobileLink name={cat.name} href={urlPrfix(cat.slug)} />
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full border rounded-lg bg-white shadow-sm"
            >
              {/* sub category accordian  */}
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                  <Link href={cat.slug == "home" ? "/" : cat.slug}>
                    {cat.name}
                  </Link>
                </AccordionTrigger>
                <AccordionContent className="p-0 border-t bg-gray-50">
                  {cat.subCategories?.map((menu, menuIdx) => (
                    <Accordion type="single" collapsible className="w-full">
                      {/* sub sub category accordian */}
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                          <SheetClose asChild>
                            <Link
                              href={"/category/" + cat.slug + "/" + menu.slug}
                            >
                              {menu.name}
                            </Link>
                          </SheetClose>
                        </AccordionTrigger>
                        <AccordionContent className="p-0 border-t bg-gray-50">
                          {menu.subSubCategories &&
                            menu.subSubCategories.map((subcat, subIdx) => (
                              <div key={subIdx}>
                                <MobileLink
                                  name={subcat.name}
                                  href={
                                    "/category/" +
                                    cat.slug +
                                    "/" +
                                    menu.slug +
                                    "/" +
                                    subcat.slug
                                  }
                                />
                              </div>
                            ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <header className="w-full bg-white/90 backdrop-blur-xl z-[100] sticky top-0 left-0  shadow-sm">
        {/* Top Bar */}
        <div
          className={`w-full  text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm py-2 transition-all duration-300 `}
        >
          <span>Free Shipping above ₹2000 | Welcome to Jewellery Wala</span>
        </div>

        {/* Main Header Bar */}
        <div
          className={`w-full border-b  bg-white border-amber-200 transition-all duration-300 ${
            isScrolled ? "py-2  left-0" : "py-4 " // Visual shrinking effect
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 w-full">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-amber-50 hover:text-amber-600 shrink-0"
              aria-label="Open navigation menu"
              onClick={() => setIsOffcanvasOpen(true)}
            >
              <Menu size={24} />
            </Button>

            <Link href="/">
              <Image
                src={logo || "/images/logo.png"}
                alt="Jewellery Wala"
                width={100}
                height={100}
                className={`w-auto cursor-pointer h-12 object-cover
                    ${isScrolled ? "h-8" : ""}`}
              />
            </Link>

            {/* Desktop Search (Center) */}
            <div className="hidden lg:block flex-1 px-6">
              <SearchBar className="w-full max-w-xl mx-auto group" />
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
              {/* Wishlist Icon */}
              <Link href="/wishlist" className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-amber-50 hover:text-amber-600"
                  aria-label="View wishlist"
                >
                  <Heart
                    fill={wishlistCount > 0 ? "#f5a22f" : "#FFF"}
                    size={24}
                  />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-amber-600 hover:bg-amber-700 text-[16px] shadow-sm">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="hidden md:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-amber-50 hover:text-amber-600"
                  aria-label="View shopping bag"
                >
                  <ShoppingCartIcon
                    fill={cartCount > 0 ? "#f5a22f" : "#FFF"}
                    size={28}
                  />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-amber-600 hover:bg-amber-700 text-[16px] shadow-sm">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-expanded={isSearchOpen}
                aria-controls="mobile-search-bar"
                aria-label="Toggle search bar"
              >
                <Search size={20} />
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-amber-50 hover:text-amber-600"
                    aria-label="User account menu"
                  >
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={20}
                        height={20}
                        className="rounded-full size-5 md:size-7"
                      />
                    ) : (
                      <UserIcon size={20} />
                    )}
                    {isLoggedIn && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-white/95 backdrop-blur-xl border-2 border-amber-200 shadow-xl"
                  align="end"
                >
                  {/* ... (User Dropdown Content is fine, keeping it concise) ... */}
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel className="bg-gradient-to-r from-amber-50 to-orange-50 py-3">
                        <p className="text-sm font-semibold text-gray-800">
                          Welcome back! {user?.name}
                        </p>
                        <p className="text-xs text-amber-600 mt-1 font-normal">
                          {user?.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-amber-200" />
                      {userMenuItems.map((item, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          asChild
                          className="cursor-pointer hover:bg-amber-50 hover:text-amber-600 py-3"
                        >
                          <Link href={item.href} className="flex items-center">
                            <item.icon className="mr-3" size={18} />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator className="bg-amber-200" />
                      <Link href="/profile?tab=settings&logout=true">
                        <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 py-3">
                          <LogOut className="mr-3" size={18} />
                          <span className="font-medium">Logout</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <div className="px-2 py-4">
                      <p className="text-sm text-gray-600 mb-4 font-medium text-center">
                        Sign in to your account
                      </p>
                      <div className="space-y-2 flex flex-col gap-1">
                        <Link href="/login" className="cursor-pointer">
                          <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 shadow-md">
                            Sign In
                          </Button>
                        </Link>
                        <Link className="cursor-pointer" href="/signup">
                          <Button
                            variant="outline"
                            className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                          >
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Search Bar (Conditionally Visible) */}
          <div
            id="mobile-search-bar"
            className={` lg:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen
                ? "max-h-20 opacity-100 px-4 py-1 mt-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <SearchBar className="relative" />
          </div>
        </div>

        <nav
          className={`hidden md:flex flex-wrap justify-center  space-x-8 text-sm font-sans font-[500] py-3  bg-white/95 backdrop-blur-sm  `}
        >
          {navigationData._data?.map((cat, idx) => (
            <div key={idx}>
              {/* Nav Link / Mega Menu Trigger */}
              {cat.subCategories?.length == 0 ? (
                <Link
                  href={urlPrfix(cat.slug)}
                  className="relative hover:text-amber-700 transition-colors text-[15px]  whitespace-nowrap pb-1.5 text-gray-700 group"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <div className="relative group ">
                  <button
                    onClick={() => router.push("/category/" + cat.slug)}
                    className="relative hover:text-amber-700 transition-colors text-[15px]  whitespace-nowrap pb-1.5 text-gray-700 flex items-center gap-1"
                    aria-haspopup="menu"
                  >
                    {cat.name}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  {/* Backdrop when mega menu open - using peer/group pattern */}
                  {/* <div className="hidden group-hover:block fixed top-0 left-0 right-0 bottom-0 bg-white/10 w-full h-screen backdrop-blur-md z-[998] pointer-events-none" /> */}

                  {/* Mega Menu Content - Shows on group hover */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 fixed left-1/2 -translate-x-1/2 top-full pt-1 z-[999] hover:visible hover:opacity-100">
                    <Card className="w-[1150px] max-w-[98vw] bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl p-5 border-2 border-amber-200 hover:border-amber-400">
                      <div className="grid grid-cols-5 gap-5">
                        {cat.subCategories?.map((menu, i) => (
                          <div key={i}>
                            <Link
                              href={"/category/" + cat.slug + "/" + menu.slug}
                            >
                              <h4 className="font-bold text-gray-800 mb-2 border-b-2 border-amber-400/50  text-lg hover:text-amber-600 transition-colors">
                                <Badge
                                  variant="outline"
                                  className="text-[15px] font-bold text-amber-600 border-amber-400 mb-1.5 bg-amber-50"
                                >
                                  {menu.name}
                                </Badge>
                              </h4>
                            </Link>
                            <div className="space-y-3">
                              {menu.subSubCategories &&
                                menu?.subSubCategories?.map((subcat, j) => (
                                  <div key={j}>
                                    <ul className="space-y-1 text-gray-600 text-sm">
                                      <li key={subcat._id}>
                                        <Link
                                          href={`/category/${cat.slug}/${menu.slug}/${subcat.slug}`}
                                          className="block hover:text-amber-600 cursor-pointer transition-all duration-200 hover:translate-x-1"
                                        >
                                          {subcat.name}
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      {/* Mobile Menu Button (Left) */}
      <Sheet open={isOffcanvasOpen} onOpenChange={setIsOffcanvasOpen}>
        {/* Mobile Sheet Menu Content */}
        <SheetContent
          side="left"
          className="w-[80vw] sm:w-80 bg-white p-0 z-[999]"
        >
          <SheetHeader className="border-b p-4">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Jewellery Wala Menu
            </SheetTitle>
          </SheetHeader>
          {renderMobileNav()}
        </SheetContent>
      </Sheet>
    </>
  );
}

const SearchBar = ({ className }) => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    router.push(`/search?q=${searchValue}`);
  };

  return (
    <div className={`relative ${className}`}>
      <PlaceholdersAndVanishInput
        placeholders={[
          "Search for Women's Jewellery",
          "Buy Personalized Jewellery",
          "Search for earrings",
          "Find Gift Items",
        ]}
        onSubmit={handleSubmit}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none"
        size={18}
      />
      <Search
        size={20}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 pointer-events-none"
      />
    </div>
  );
};

const urlPrfix = (slug) => {
  if (slug == "home") return "/";
  else if (slug == "track-your-order") return "/order-track";
  else if (slug == "contact-us") return "/contact-us";
  return "/category/" + slug;
};
