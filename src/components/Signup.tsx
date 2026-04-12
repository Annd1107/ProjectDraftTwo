import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, Lock, User, School, Hash, Building, ArrowRight, Eye, EyeOff, Users, Trophy, GraduationCap } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";

export function Signup() {
  const [role, setRole] = useState<"student" | "organizer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [organization, setOrganization] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const { signup  } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData: any = {
        email,
        password,
        name,
        role,
      };

      if (role === "student") {
        userData.school = school;
        userData.grade = parseInt(grade);
        userData.birthdate = birthdate; 
      } else {
        userData.organization = organization;
      }

        
      const success = await signup(userData);

      if (success) {
        navigate("/");
      } else {
        setError("Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image & Content */}
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
            <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/50 border-8 border-white/20 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="size-48 text-white opacity-80" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <GraduationCap className="size-8 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="text-xl text-violet-100">
              Start your journey to academic excellence today
            </p>
          </div>

          <div className="space-y-3 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trophy className="size-5" />
              </div>
              <span>Access 45+ tournaments</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="size-5" />
              </div>
              <span>Join 1,200+ students</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <GraduationCap className="size-5" />
              </div>
              <span>Track your achievements</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo and Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <img src={"src/assets/f903ce71512caff8e98ba718ecc02ebdf4aae725.png"} alt="Logo" className="size-12 rounded-xl shadow-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                TemtseenPortal
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t("signup.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("signup.subtitle")}
            </p>
          </div>

          {/* Signup Form */}
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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t("signup.role")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`p-4 rounded-2xl border-2 transition-all ${role === "student"
                    ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                    }`}
                >
                  <Users className={`size-6 mx-auto mb-2 ${role === "student" ? "text-violet-600 dark:text-violet-400" : "text-gray-400"
                    }`} />
                  <span className={`block text-sm font-semibold ${role === "student" ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"
                    }`}>
                    Student
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("organizer")}
                  className={`p-4 rounded-2xl border-2 transition-all ${role === "organizer"
                    ? "border-violet-600 bg-violet-50 dark:bg-violet-950/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700"
                    }`}
                >
                  <Trophy className={`size-6 mx-auto mb-2 ${role === "organizer" ? "text-violet-600 dark:text-violet-400" : "text-gray-400"
                    }`} />
                  <span className={`block text-sm font-semibold ${role === "organizer" ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"
                    }`}>
                    Organizer
                  </span>
                </button>
              </div>
            </div>

            {/* Common Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("signup.name")}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("signup.email")}
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

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("signup.password")}
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

              {/* Role-specific fields */}
              {role === "student" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t("signup.school")}
                    </label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        placeholder="Your school name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t("signup.grade")}
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none transition-all"
                      >
                        <option value="">Select grade</option>
                        {[9, 10, 11, 12].map((g) => (
                          <option key={g} value={g}>
                            Grade {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t("signup.organization")}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                      placeholder="Your organization"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
            >
              <span>{t("signup.button")}</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
              {t("signup.hasAccount")}{" "}
              <Link
                to="/login"
                className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                {t("signup.loginLink")}
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}