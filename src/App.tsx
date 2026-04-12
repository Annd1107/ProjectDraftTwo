import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./lib/auth-context";
import { OlympiadProvider } from "./lib/tournament-context";
import { LanguageProvider } from "./lib/language-context";
import { ThemeProvider } from "./lib/theme-context";
import { AchievementProvider } from "./lib/achievement-context";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <OlympiadProvider>
            <AchievementProvider>
              <RouterProvider router={router} />
            </AchievementProvider>
          </OlympiadProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}