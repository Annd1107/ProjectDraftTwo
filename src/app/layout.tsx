import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../lib/auth-context";
import { TournamentProvider } from "../lib/tournament-context";
import { LanguageProvider } from "../lib/language-context";
import { ThemeProvider } from "../lib/theme-context";
import { AchievementProvider } from "../lib/achievement-context";
import { Navigation } from "../components/Navigation";
import { Toaster } from "sonner@2.0.3";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TemtseenPortal - Mongolian High School Olympiad Registration",
  description: "Registration portal for Mongolian high schoolers to register for olympiads and tournaments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <TournamentProvider>
                <AchievementProvider>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1">{children}</main>
                    <Toaster position="top-right" richColors />
                    
                    {/* Enhanced Footer */}
                    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white mt-auto border-t border-purple-800/30">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Main Footer Content */}
                        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {/* About Section */}
                          <div>
                            <h3 className="font-bold text-xl mb-4 text-purple-300">TemtseenPortal</h3>
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                              Монгол улсын сурагчдад зориулсан олимпиад, тэмцээний платформ. Боловсролын шинэ үе.
                            </p>
                            <div className="flex gap-3">
                              <a href="#" className="w-10 h-10 rounded-full bg-purple-800/50 hover:bg-purple-700 flex items-center justify-center transition-colors">
                                <Facebook className="size-5" />
                              </a>
                              <a href="#" className="w-10 h-10 rounded-full bg-purple-800/50 hover:bg-purple-700 flex items-center justify-center transition-colors">
                                <Twitter className="size-5" />
                              </a>
                              <a href="#" className="w-10 h-10 rounded-full bg-purple-800/50 hover:bg-purple-700 flex items-center justify-center transition-colors">
                                <Instagram className="size-5" />
                              </a>
                              <a href="#" className="w-10 h-10 rounded-full bg-purple-800/50 hover:bg-purple-700 flex items-center justify-center transition-colors">
                                <Youtube className="size-5" />
                              </a>
                            </div>
                          </div>

                          {/* Quick Links */}
                          <div>
                            <h3 className="font-bold text-lg mb-4 text-purple-300">Холбоосууд</h3>
                            <ul className="space-y-2 text-sm">
                              <li><Link href="/" className="text-gray-300 hover:text-purple-300 transition-colors">Нүүр</Link></li>
                              <li><Link href="/about" className="text-gray-300 hover:text-purple-300 transition-colors">Бидний тухай</Link></li>
                              <li><Link href="/tournaments" className="text-gray-300 hover:text-purple-300 transition-colors">Тэмцээнүүд</Link></li>
                              <li><Link href="/faq" className="text-gray-300 hover:text-purple-300 transition-colors">Түгээмэл асуулт</Link></li>
                              <li><Link href="/contact" className="text-gray-300 hover:text-purple-300 transition-colors">Холбоо барих</Link></li>
                            </ul>
                          </div>

                          {/* Support */}
                          <div>
                            <h3 className="font-bold text-lg mb-4 text-purple-300">Дэмжлэг</h3>
                            <ul className="space-y-2 text-sm">
                              <li><Link href="/help" className="text-gray-300 hover:text-purple-300 transition-colors">Тусламж төв</Link></li>
                              <li><Link href="/guidelines" className="text-gray-300 hover:text-purple-300 transition-colors">Заавар</Link></li>
                              <li><Link href="/privacy" className="text-gray-300 hover:text-purple-300 transition-colors">Нууцлал</Link></li>
                              <li><Link href="/terms" className="text-gray-300 hover:text-purple-300 transition-colors">Үйлчилгээний нөхцөл</Link></li>
                            </ul>
                          </div>

                          {/* Contact Info */}
                          <div>
                            <h3 className="font-bold text-lg mb-4 text-purple-300">Холбоо барих</h3>
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-start gap-2 text-gray-300">
                                <MapPin className="size-4 mt-1 flex-shrink-0 text-purple-400" />
                                <span>Улаанбаатар хот, Монгол Улс</span>
                              </li>
                              <li className="flex items-center gap-2 text-gray-300">
                                <Phone className="size-4 flex-shrink-0 text-purple-400" />
                                <span>+976 7000-0000</span>
                              </li>
                              <li className="flex items-center gap-2 text-gray-300">
                                <Mail className="size-4 flex-shrink-0 text-purple-400" />
                                <span>info@temtseen.mn</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="py-6 border-t border-purple-800/30">
                          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                            <p>© 2026 TemtseenPortal. Бүх эрх хуулиар хамгаалагдсан.</p>
                            <div className="flex gap-6">
                              <Link href="/privacy" className="hover:text-purple-300 transition-colors">Нууцлал</Link>
                              <Link href="/terms" className="hover:text-purple-300 transition-colors">Үйлчилгээний нөхцөл</Link>
                              <Link href="/sitemap" className="hover:text-purple-300 transition-colors">Сайтын зураглал</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </AchievementProvider>
              </TournamentProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}