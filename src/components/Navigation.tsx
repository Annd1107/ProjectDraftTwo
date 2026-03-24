"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Trophy, LogOut, Home, User, Info, LayoutDashboard, Globe, Bell, Moon, Sun, Menu, X, BookOpen, HelpCircle, Phone } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { useTheme } from "../lib/theme-context";
import { useState } from "react";

export function Navigation() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "mn" ? "en" : "mn");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-10 w-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="block text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  TemtseenPortal
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">Олимпиад Платформ</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link 
                href="/" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive("/")
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Home className="size-4" />
                <span className="font-medium">{t("nav.home")}</span>
              </Link>
              
              <Link 
                href="/about" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive("/about")
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Info className="size-4" />
                <span className="font-medium">{t("nav.about")}</span>
              </Link>

              <Link 
                href="/tournaments" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive("/tournaments")
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Trophy className="size-4" />
                <span className="font-medium">Тэмцээнүүд</span>
              </Link>

              <Link 
                href="/faq" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive("/faq")
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <HelpCircle className="size-4" />
                <span className="font-medium">FAQ</span>
              </Link>

              {user && (
                <Link 
                  href={user.role === "organizer" ? "/organizer" : "/student"} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive("/student") || isActive("/organizer")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <LayoutDashboard className="size-4" />
                  <span className="font-medium">{t("nav.dashboard")}</span>
                </Link>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {user && (
                <>
                  <Link 
                    href="/notifications" 
                    className="hidden sm:flex relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    title={t("nav.notifications")}
                  >
                    <Bell className="size-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <Link 
                    href="/profile" 
                    className="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    title={t("nav.profile")}
                  >
                    <User className="size-5" />
                  </Link>
                </>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                title={theme === "light" ? "Dark Mode" : "Light Mode"}
              >
                {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </button>

              <button
                onClick={toggleLanguage}
                className="hidden sm:flex px-3 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold text-sm"
                title={language === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих"}
              >
                {language === "mn" ? "EN" : "МН"}
              </button>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-md hover:shadow-lg font-medium text-sm"
                >
                  <LogOut className="size-4" />
                  <span>{t("nav.logout")}</span>
                </button>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="hidden sm:inline-flex px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all font-medium text-sm"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link 
                    href="/signup" 
                    className="hidden sm:inline-flex px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-medium text-sm"
                  >
                    {t("nav.signup")}
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu}>
          <div 
            className="absolute right-0 top-16 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              {/* User Info */}
              {user && (
                <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Home className="size-5" />
                  <span className="font-medium">{t("nav.home")}</span>
                </Link>
                
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/about")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Info className="size-5" />
                  <span className="font-medium">{t("nav.about")}</span>
                </Link>

                <Link 
                  href="/tournaments" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/tournaments")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Trophy className="size-5" />
                  <span className="font-medium">Тэмцээнүүд</span>
                </Link>

                <Link 
                  href="/faq" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/faq")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <HelpCircle className="size-5" />
                  <span className="font-medium">FAQ</span>
                </Link>

                <Link 
                  href="/contact" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive("/contact")
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Phone className="size-5" />
                  <span className="font-medium">Холбоо барих</span>
                </Link>

                {user && (
                  <>
                    <div className="h-px bg-gray-200 dark:bg-gray-800 my-4"></div>
                    
                    <Link 
                      href={user.role === "organizer" ? "/organizer" : "/student"} 
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive("/student") || isActive("/organizer")
                          ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <LayoutDashboard className="size-5" />
                      <span className="font-medium">{t("nav.dashboard")}</span>
                    </Link>

                    <Link 
                      href="/notifications" 
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                        isActive("/notifications")
                          ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Bell className="size-5" />
                      <span className="font-medium">{t("nav.notifications")}</span>
                      <span className="absolute right-4 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Link>

                    <Link 
                      href="/profile" 
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive("/profile")
                          ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <User className="size-5" />
                      <span className="font-medium">{t("nav.profile")}</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="size-5" />
                    <span className="font-medium">Language</span>
                  </div>
                  <span className="font-semibold text-sm">{language === "mn" ? "EN" : "МН"}</span>
                </button>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    <LogOut className="size-5" />
                    <span>{t("nav.logout")}</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/login" 
                      onClick={closeMobileMenu}
                      className="w-full flex items-center justify-center px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all font-medium"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link 
                      href="/signup" 
                      onClick={closeMobileMenu}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                      {t("nav.signup")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}