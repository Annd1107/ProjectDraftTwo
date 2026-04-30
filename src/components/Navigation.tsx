"use client";

import { Link, useNavigate, useLocation } from "react-router";
import {
  Trophy, LogOut, Home, User, Info, LayoutDashboard,
  Globe, Bell, Moon, Sun, Menu, X
} from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { useTheme } from "../lib/theme-context";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function Navigation() {
  
  const [hasNotifications, setHasNotifications] = useState(false);

  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hideDot = location.pathname === "/notifications";

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
  const { data, error } = await supabase
    .from("notifications")
    .select("id")
    .eq("user_id", user.id)
    .eq("read", false)

  if (!error) {
    setHasNotifications((data?.length ?? 0) > 0);
  }
};


    fetchNotifications();
  }, [user]);
  useEffect(() => {
  if (location.pathname === "/notifications" && user) {
    const markAsRead = async () => {
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", user.id);
    };

    markAsRead();
    setHasNotifications(false);
  }
}, [location.pathname, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "mn" ? "en" : "mn");
  };

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center gap-2">
              {user && (
                <>
                  <Link
                    to="/notifications"
                    className="hidden sm:flex relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <Bell className="size-5" />

                    {hasNotifications && !hideDot && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="hidden sm:flex p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <User className="size-5" />
                  </Link>
                </>
              )}

              <button onClick={toggleTheme} className="p-2 rounded-xl">
                {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-16 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900">


            {user && (
              <Link
                to="/notifications"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
              >
                <Bell className="size-5" />
                <span>{t("nav.notifications")}</span>

                {hasNotifications && !hideDot && (
                  <span className="ml-auto h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            )}

          </div>
        </div>
      )}
    </>
  );
}