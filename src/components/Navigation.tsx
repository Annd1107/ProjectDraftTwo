"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, LogOut, Home, User, Info, LayoutDashboard, Globe, Bell, Moon, Sun } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { useTheme } from "../lib/theme-context";

export function Navigation() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleLanguage = () => {
    setLanguage(language === "mn" ? "en" : "mn");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1640356872989-e5a9cdcdd653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBjb21wZXRpdGlvbiUyMHB1cnBsZSUyMGxvZ28lMjB0cmFuc3BhcmVudHxlbnwxfHx8fDE3NzI1MDMzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="TemtseenPortal Logo" 
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 w-40">{t("home.title")}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Main Navigation */}
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
            >
              <Home className="size-4" />
              <span className="hidden sm:inline w-12">{t("nav.home")}</span>
            </Link>
            
            <Link 
              href="/about" 
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
            >
              <Info className="size-4" />
              <span className="hidden sm:inline w-12">{t("nav.about")}</span>
            </Link>

            {user && (
              <>
                <Link 
                  href={user.role === "organizer" ? "/organizer" : "/student"} 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                >
                  <LayoutDashboard className="size-4" />
                  <span className="hidden sm:inline w-20">{t("nav.dashboard")}</span>
                </Link>
                <Link 
                  href="/notifications" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  title={t("nav.notifications")}
                >
                  <Bell className="size-4" />
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  title={t("nav.profile")}
                >
                  <User className="size-4" />
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
              title={theme === "light" ? t("nav.darkMode") : t("nav.lightMode")}
            >
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
              title={language === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих"}
            >
              <Globe className="size-4" />
              <span className="font-semibold w-6">{language === "mn" ? "EN" : "МН"}</span>
            </button>

            {/* Auth Buttons */}
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors ml-2"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline w-12">{t("nav.logout")}</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <span className="w-16 inline-block text-center">{t("nav.login")}</span>
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <span className="w-20 inline-block text-center">{t("nav.signup")}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}