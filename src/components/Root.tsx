import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Trophy, LogOut, Home, User, Info, LayoutDashboard, Globe, Bell, Moon, Sun, Award, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { useTheme } from "../lib/theme-context";
import logo from "figma:asset/logopurple.png";
import { supabase } from "../utils/supabase";

export function Root() {
  const [hasNotifications, setHasNotifications] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleLanguage = () => {
    setLanguage(language === "mn" ? "en" : "mn");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const hideDot = location.pathname === "/notifications";
  
    // ✅ fetch if user has ANY notifications
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

  const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition-all ${
        isActive(to)
          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
          : 'text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30 transition-colors justify-between flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-violet-200/50 dark:border-violet-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src={logo} alt="Logo" className="size-12 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
                <div className="absolute -top-1 -right-1 size-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  TemtseenPortal
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Olympiad Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <NavLink to="/">{t("nav.home")}</NavLink>
              <NavLink to="/about">{t("nav.about")}</NavLink>
              
              {user && (
                <>
                  <NavLink to={user.role === "organizer" ? "/organizer" : "/student"}>
                    {t("nav.dashboard")}
                  </NavLink>
                  <NavLink to={user.role === "student" ? "/achievements" : "/rankings"}>{user.role === "student" ?  t("nav.achievements") : "Rankings"}</NavLink>
                  <Link
                    to="/notifications"
                    className="hidden sm:flex relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <Bell className="size-5" />
                    {hasNotifications && !hideDot && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                  <NavLink to="/profile">
                    <User className="size-5" />
                  </NavLink>
                </>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                title={theme === "light" ? t("nav.darkMode") : t("nav.lightMode")}
              >
                {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors font-semibold"
                title={language === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих"}
              >
                {language === "mn" ? "EN" : "МН"}
              </button>

              {/* Auth Buttons */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-red-600 shadow-lg shadow-rose-500/30 transition-all ml-2"
                >
                  <LogOut className="size-4" />
                  <span>{t("nav.logout")}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl font-semibold transition-all"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/30 transition-all"
                  >
                    {t("nav.signup")}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-violet-200/50 dark:border-violet-800/50">
              <nav className="flex flex-col gap-2">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.home")}
                </NavLink>
                <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.about")}
                </NavLink>
                
                {user && (
                  <>
                    <NavLink
                      to={user.role === "organizer" ? "/organizer" : "/student"}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.dashboard")}
                    </NavLink>
                    <NavLink to="/achievements" onClick={() => setMobileMenuOpen(false)}>
                      {t("nav.achievements")}
                    </NavLink>
                    <NavLink to="/notifications" onClick={() => setMobileMenuOpen(false)}>
                      {t("nav.notifications")}
                    </NavLink>
                    <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      {t("nav.profile")}
                    </NavLink>
                  </>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-violet-300 dark:via-violet-700 to-transparent my-2"></div>

                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl transition-all text-left"
                >
                  {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
                  <span>{theme === "light" ? t("nav.darkMode") : t("nav.lightMode")}</span>
                </button>

                <button
                  onClick={() => {
                    toggleLanguage();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl transition-all text-left"
                >
                  <Globe className="size-5" />
                  <span>{language === "mn" ? "English" : "Монгол"}</span>
                </button>

                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl font-semibold mt-2"
                  >
                    <LogOut className="size-5" />
                    <span>{t("nav.logout")}</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 text-center border-2 border-violet-300 dark:border-violet-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 text-center bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold"
                    >
                      {t("nav.signup")}
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-violet-200/50 dark:border-violet-800/50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Logo" className="size-10 rounded-xl shadow-lg" />
                <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  TemtseenPortal
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Mongolia's premier platform for academic olympiads and competitions.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors">
                  About Us
                </Link>
                {user && (
                  <Link
                    to={user.role === "organizer" ? "/organizer" : "/student"}
                    className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Contact</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Ulaanbaatar, Mongolia
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                info@temtseenportal.mn
              </p>
            </div>
          </div>

          <div className="border-t border-violet-200/50 dark:border-violet-800/50 pt-6">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2026 TemtseenPortal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-fuchsia-400 to-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none -z-10"></div>
    </div>
  );
}