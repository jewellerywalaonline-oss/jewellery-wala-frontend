"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  ShoppingCartIcon,
  Truck,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "motion/react";
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
import {
  fetchAndDispatchCart,
  fetchAndDispatchWishlist,
} from "@/lib/fetchCartWislist";
import { usePathname, useRouter } from "next/navigation";
import { openLoginModal, setNavigation } from "@/redux/features/uiSlice";
import Cookies from "js-cookie";
import { getUser } from "@/lib/fetchUser";
import { logout, setProfile } from "@/redux/features/auth";
import axios from "axios";

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

export default function Header({ navigationData }) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.totalQuantity);

  const pathName = usePathname();

  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.details);
  const backUpToken =useSelector((state) => state.auth.user);
  const logo = useSelector((state) => state.logo.logo);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    if(!isLoggedIn){
      dispatch(logout());
      return;
    }
    if (user && user._id) {
      return;
    }
    const userData = await getUser(dispatch, backUpToken);
    dispatch(setProfile(userData?._data));
  };

  useEffect(() => {
    if (pathName !== "/profile") {
      fetchUser();
    }
  }, [isLoggedIn]);

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

  useEffect(() => {
    if (isLoggedIn) {
      fetchAndDispatchWishlist(dispatch);
      fetchAndDispatchCart(dispatch);
    }
  }, [isLoggedIn]);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
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

  const mobileSearchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        // Check if the click is not on the search toggle button
        const searchToggleButton = document.getElementById(
          "search-toggle-button"
        );
        if (searchToggleButton && !searchToggleButton.contains(event.target)) {
          setIsSearchOpen(false);
        }
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <div className="w-full text-center bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-sm py-2.5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer"></div>
        <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
          <Truck className="inline rotate-y-180" size={16} />
          Free Shipping above ₹1000 | Welcome to{" "}
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
      </div>

      <header className="max-w-screen w-full bg-white/95 z-[190] sticky top-0 left-0 shadow-lg border-b  border-amber-100/50">
        {/* Main Header Bar */}
        <div
          className={`w-full border-b   bg-white/95  border-amber-100/50 transition-all duration-500 ${
            isScrolled ? "py-2 shadow-md" : "py-4"
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 w-full">
            {/* Mobile Menu Button - Enhanced */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-amber-50 hover:text-amber-600 shrink-0 rounded-xl transition-all duration-300"
              aria-label="Open navigation menu"
              onClick={() => setIsOffcanvasOpen(true)}
            >
              <Menu size={24} />
            </Button>

            {/* Logo - Enhanced with subtle animation */}
            <Link href="/" className="group">
              <Image
                src={logo || "/images/logo.png"}
                alt="Jewellery Wala"
                width={100}
                height={100}
                className={`w-auto cursor-pointer object-cover transition-all duration-500 group-hover:scale-105 ${
                  isScrolled ? "h-8" : "h-12"
                }`}
              />
            </Link>

            {/* Desktop Search - Enhanced with premium shadow */}
            <div className="hidden  lg:block flex-1 px-6">
              <SearchBar className="w-full max-w-xl mx-auto" />
            </div>

            {/* Icons - Enhanced with better hover states */}
            <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
              {/* Wishlist Icon - Premium style */}
              <Link href="/wishlist" className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:text-amber-600 rounded-xl transition-all duration-300 hover:scale-105"
                  aria-label="View wishlist"
                >
                  <Heart
                    fill={wishlistCount > 0 ? "#f59e0b" : "none"}
                    size={22}
                    className={wishlistCount > 0 ? "text-amber-600" : ""}
                  />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1.5 -right-1.5 size-5 flex items-center justify-center p-0 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-xs shadow-lg border-2 border-white">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart Icon - Premium style */}
              <Link href="/cart" className="hidden md:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:text-amber-600 rounded-xl transition-all duration-300 hover:scale-105"
                  aria-label="View shopping bag"
                >
                  <ShoppingCartIcon
                    fill={cartCount > 0 ? "#f59e0b" : "none"}
                    size={24}
                    className={cartCount > 0 ? "text-amber-600" : ""}
                  />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-xs shadow-lg border-2 border-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Search Toggle - Enhanced */}
              <Button
                id="search-toggle-button"
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:text-amber-600 rounded-xl transition-all duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-expanded={isSearchOpen}
                aria-controls="mobile-search-bar"
                aria-label="Toggle search bar"
              >
                <Search size={20} />
              </Button>

              {/* User Dropdown - Enhanced */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:text-amber-600 rounded-xl transition-all duration-300 hover:scale-105"
                    aria-label="User account menu"
                  >
                    {user?.avatar ? (
                      <div className="relative">
                        <Image
                          src={user.avatar}
                          alt="User Avatar"
                          width={28}
                          height={28}
                          className="rounded-full size-6 md:size-7 border-2 border-amber-200"
                        />
                      </div>
                    ) : (
                      <UserIcon size={20} />
                    )}
                    {isLoggedIn && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-white/98  border border-amber-200/50 shadow-2xl rounded-xl"
                  align="end"
                >
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel className="bg-gradient-to-br from-amber-50 to-orange-50 py-4 rounded-t-xl">
                        <p className="text-sm font-semibold text-slate-800">
                          Welcome back! {user?.name}
                        </p>
                        <p className="text-xs text-amber-600 mt-1 font-medium">
                          {user?.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-amber-100" />
                      {userMenuItems.map((item, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          asChild
                          className="cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 py-3 transition-all duration-200"
                        >
                          <Link href={item.href} className="flex items-center">
                            <item.icon className="mr-3" size={18} />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator className="bg-amber-100" />
                      <Link href="/profile?tab=settings&logout=true">
                        <DropdownMenuItem className="cursor-pointer text-rose-600 hover:bg-rose-50 hover:text-rose-700 py-3 transition-all duration-200">
                          <LogOut className="mr-3" size={18} />
                          <span className="font-medium">Logout</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <div className="px-3 py-5">
                      <p className="text-sm text-slate-600 mb-4 font-medium text-center">
                        Sign in to your account
                      </p>
                      <div className="space-y-2 flex flex-col gap-2">
                        <Link href="/login" className="cursor-pointer">
                          <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all duration-300">
                            Sign In
                          </Button>
                        </Link>
                        <Link className="cursor-pointer" href="/signup">
                          <Button
                            variant="outline"
                            className="w-full border-2 border-amber-500 text-amber-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300"
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

          {/* Mobile Search Bar - Enhanced */}
          <div
            ref={mobileSearchRef}
            id="mobile-search-bar"
            className={`w-full lg:hidden transition-all duration-300 ${
              isSearchOpen
                ? "opacity-100 px-4 mt-3 mb-2"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <SearchBar className="relative" />
          </div>
        </div>

        {/* Premium Navigation Bar */}
        <nav className="hidden md:flex flex-wrap justify-center items-center space-x-8 text-sm font-medium py-3.5  bg-white   border-b border-amber-100/30">
          {navigationData._data?.map((cat, idx) => (
            <div key={idx}>
              {cat.subCategories?.length == 0 ? (
                <Link
                  href={urlPrfix(cat.slug)}
                  className="relative hover:text-amber-700 transition-all duration-300 text-[15px] whitespace-nowrap pb-1.5 text-slate-700 group font-medium"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 transition-all duration-300 group-hover:w-full shadow-sm"></span>
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    onClick={() => router.push("/category/" + cat.slug)}
                    className="relative hover:text-amber-700 transition-all duration-300 text-[15px] whitespace-nowrap pb-1.5 text-slate-700 flex items-center gap-1.5 font-medium"
                    aria-haspopup="menu"
                  >
                    {cat.name}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 transition-all duration-300 group-hover:w-full shadow-sm"></span>
                  </button>

                  {/* Premium Mega Menu */}
                  <div
                    className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 [transform:_perspective(600px)_rotateX(-90deg)] duration-500 skew-x-10 group-hover:skew-x-0 origin-top group-hover:[transform:_perspective(1200px)_rotateX(0deg)] transition-all fixed left-1/2 -translate-x-1/2 ${
                      isScrolled ? "top-[110px]" : "top-[175px]"
                    } pt-1 z-[999] hover:visible hover:opacity-100`}
                  >
                    <Card className="w-[1150px] backdrop-blur-xl max-w-[98vw] h-auto bg-white/98  shadow-2xl rounded-2xl p-6 border border-amber-200/50">
                      <div className="grid grid-cols-5 gap-6">
                        {cat.subCategories?.map((menu, i) => (
                          <div key={i} className="group/menu">
                            <Link
                              href={"/category/" + cat.slug + "/" + menu.slug}
                            >
                              <h4 className="font-bold text-slate-800 mb-2 pb-1 border-b border-amber-200/50 text-base hover:text-amber-700 transition-colors">
                                <Badge
                                  variant="outline"
                                  className="text-sm font-bold text-amber-700 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 px-3 py-1"
                                >
                                  {menu.name}
                                </Badge>
                              </h4>
                            </Link>
                            <div className="space-y-2.5">
                              {menu.subSubCategories?.map((subcat, j) => (
                                <div key={j}>
                                  <ul className="space-y-1 text-slate-600 text-sm">
                                    <li key={subcat._id}>
                                      <Link
                                        href={`/category/${cat.slug}/${menu.slug}/${subcat.slug}`}
                                        className="block hover:text-amber-600 cursor-pointer transition-all duration-200 hover:translate-x-1 hover:font-medium py-[2px]"
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
        <SheetContent
          side="left"
          className="w-[80vw] sm:w-80 bg-white p-0 z-[999] border-r border-amber-200/50"
        >
          <SheetHeader className="border-b border-amber-100/50 p-5 bg-gradient-to-r from-amber-50 to-orange-50">
            <SheetTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Menu
            </SheetTitle>
          </SheetHeader>
          {renderMobileNav()}
        </SheetContent>
      </Sheet>
    </>
  );
}

const SearchBar = ({ className }) => {
  const [suggestions, setSuggestions] = useState({});
  const value = useSelector((state) => state.ui.searchValue);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    router.push(`/search?q=${searchValue}`);
  };
  const suggestionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    const fetch = async () => {
      if (value.trim().length > 1) {
        // Only fetch if more than 1 character
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/website/result/suggestion?search=${value}`
          );
          setSuggestions(res.data._data);
          setIsSuggestionsOpen(true);
        } catch (error) {
          setSuggestions({});
          setIsSuggestionsOpen(false);
        }
      } else {
        setIsSuggestionsOpen(false);
      }
    };

    // Add a small debounce to prevent too many requests
    const debounceTimer = setTimeout(() => {
      fetch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [value]);

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
      {/* <div
        onClick={() => setIsSuggestionsOpen(false)}
        className={`fixed right-0 top-full h-screen w-screen max-w-[100%] bg-black/70 z-10 transition-opacity duration-300 ${
          isSuggestionsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      /> */}

      {isSuggestionsOpen && (
        <motion.div
          initial="closed"
          animate={isSuggestionsOpen ? "open" : "closed"}
          variants={suggestionVariants}
          className="absolute top-full left-0 right-0 h-auto w-[78%] md:w-full mt-1 bg-white rounded-lg shadow-lg z-[200] border border-gray-200 overflow-x-hidden overflow-y-auto no-scrollbar"
        >
          <div className="grid grid-cols-[30%_auto] divide-x divide-gray-200">
            {/* Suggestions Column */}
            {suggestions?.suggestions?.length > 0 ||
            suggestions?.products?.length > 0 ? (
              <>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 ">
                    <span>Suggestions</span>
                  </h3>
                  <div className="space-y-2">
                    {suggestions?.suggestions?.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                        onClick={() => router.push(`/search?q=${suggestion}`)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Column */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
                    <span>Products</span>
                    <span
                      onClick={() => setIsSuggestionsOpen(false)}
                      className="cursor-pointer"
                    >
                      <X size={16} />
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-auto no-scrollbar">
                    {suggestions?.products?.map((product) => (
                      <Link
                        onClick={() => setIsSuggestionsOpen(false)}
                        key={product._id}
                        href={`/product-details/${product.slug}`}
                        className="group flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="relative w-full aspect-square mb-2 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-sm font-medium  line-clamp-2">
                          {product.name}
                        </p>
                        <p className="text-amber-600 font-medium mt-1">
                          ₹{product.discount_price || product.price}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 col-span-2 text-center text-gray-500">
                No suggestions found
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const urlPrfix = (slug) => {
  if (slug == "home") return "/";
  else if (slug == "track-your-order") return "/order-track";
  else if (slug == "contact-us") return "/contact-us";
  return "/category/" + slug;
};
