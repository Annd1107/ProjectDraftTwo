import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, Lock, ArrowRight, Trophy, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "organizer">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const logo = "src/assets/f903ce71512caff8e98ba718ecc02ebdf4aae725.png";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password, role);
    if (success) {
      // Redirect to home page after successful login
      navigate("/");
    } else {
      setError(t("login.error"));
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo and Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <img src={logo} alt="Logo" className="size-12 rounded-xl shadow-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                TemtseenPortal
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("login.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("login.subtitle")}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl"
              >
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("login.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("login.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
              {/* Role Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("login.role")}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value as "student" | "organizer")}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{t("login.student") || "Student"}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="organizer"
                      checked={role === "organizer"}
                      onChange={(e) => setRole(e.target.value as "student" | "organizer")}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{t("login.organizer") || "Organizer"}</span>
                  </label>
                </div>
              </div>
            </div>
            </div>
            

            {/* Demo Accounts */}
            <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Demo Accounts:
              </p>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <p>Student: student@test.com / password</p>
                <p>Organizer: organizer@test.com / password</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
            >
              <span>{t("login.button")}</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
              {t("login.noAccount")}{" "}
              <Link
                to="/signup"
                className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                {t("login.signupLink")}
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right Side - Image & Content */}
      <div className="hidden lg:flex items-center justify-center p-16 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg space-y-8 text-center"
        >
          <div className="relative inline-block">
            <div className="w-80 h-80 rounded-full flex items-center justify-center bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm shadow-2xl shadow-violet-900/50 border-8 border-white/20">
              <Trophy className="size-32 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <Trophy className="size-8 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Welcome Back!
            </h2>
            <p className="text-xl text-violet-100">
              Continue your journey to academic excellence
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">1.2K+</div>
              <div className="text-violet-100 text-sm">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">45+</div>
              <div className="text-violet-100 text-sm">Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-violet-100 text-sm">Organizers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}