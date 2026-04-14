import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./lib/auth-context";
import { OlympiadProvider } from "./lib/tournament-context";
import { LanguageProvider } from "./lib/language-context";
import { ThemeProvider } from "./lib/theme-context";
import { AchievementProvider } from "./lib/achievement-context";
import { EventProvider } from "./lib/event-context"

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <OlympiadProvider>
            <EventProvider>
            <AchievementProvider>
              <RouterProvider router={router} />
            </AchievementProvider>
            </EventProvider>
          </OlympiadProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}