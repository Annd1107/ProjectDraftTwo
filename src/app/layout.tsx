import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../lib/auth-context";
import { TournamentProvider } from "../lib/tournament-context";
import { LanguageProvider } from "../lib/language-context";
import { ThemeProvider } from "../lib/theme-context";
import { AchievementProvider } from "../lib/achievement-context";
import { Navigation } from "../components/Navigation";

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
                  <Navigation />
                  <main>{children}</main>
                  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        © 2026 TemtseenPortal. All rights reserved.
                      </p>
                    </div>
                  </footer>
                </AchievementProvider>
              </TournamentProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
