"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, AlertCircle, Trophy, ArrowLeft } from "lucide-react";
import { useAuth } from "../../lib/auth-context";
import { useLanguage } from "../../lib/language-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "organizer">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        router.push(role === "organizer" ? "/organizer" : "/student");
      } else {
        setError(t("auth.invalidCredentials"));
      }
    } catch (err) {
      setError(t("auth.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t("profile.back")}</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Trophy className="size-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {t("nav.login")}
            </h2>
            <p className="text-purple-100">
              {t("home.title")}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t("auth.selectRole")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`relative p-4 rounded-xl border-2 transition-all font-medium ${
                      role === "student"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-md"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700"
                    }`}
                  >
                    <Trophy className="size-5 mx-auto mb-2" />
                    <div className="text-sm">{t("auth.studentLogin").replace(" нэвтрэх", "").replace(" Login", "")}</div>
                    {role === "student" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full"></div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`relative p-4 rounded-xl border-2 transition-all font-medium ${
                      role === "organizer"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-md"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <User className="size-5 mx-auto mb-2" />
                    <div className="text-sm">{t("auth.organizerLogin").replace(" нэвтрэх", "").replace(" Login", "")}</div>
                    {role === "organizer" && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("auth.email")}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all placeholder:text-gray-400"
                    placeholder="user@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? t("payment.processing") : t("auth.login")}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t("auth.noAccount")}{" "}
                <Link href="/signup" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold">
                  {t("auth.signupHere")}
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo credentials:</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Student:</span> bold@student.mn
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Organizer:</span> sarnai@organizer.mn
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Password: Any text (demo mode)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}