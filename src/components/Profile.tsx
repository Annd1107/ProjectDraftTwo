import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, School, GraduationCap, Building, Phone, MapPin, Save, ArrowLeft, Edit3, Shield } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";

export function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    school: user.school || "",
    grade: user.grade || "",
    organization: user.organization || "",
    address: user.address || "",
  });

  const handleSave = () => {
    setIsEditing(false);
    alert(t("profile.saveSuccess"));
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="size-4" />
          {t("profile.back")}
        </button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-2xl shadow-violet-500/30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="size-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl">
                <User className="size-16 text-white" />
              </div>
              <div className={`absolute -bottom-2 -right-2 p-2 rounded-full ${
                user.role === "student" 
                  ? "bg-green-500" 
                  : "bg-amber-500"
              } border-4 border-violet-600 shadow-lg`}>
                {user.role === "student" ? (
                  <GraduationCap className="size-5 text-white" />
                ) : (
                  <Shield className="size-5 text-white" />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {user.name}
              </h1>
              <p className="text-violet-100 text-lg">
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  user.role === "student"
                    ? "bg-green-500/20 text-green-100 border border-green-400/30"
                    : "bg-amber-500/20 text-amber-100 border border-amber-400/30"
                }`}>
                  {user.role === "student" ? "Student" : "Organizer"}
                </span>
                {user.school && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/30">
                    <School className="size-4" />
                    {user.school}
                  </span>
                )}
                {user.grade && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/30">
                    <GraduationCap className="size-4" />
                     {user.grade}-р Анги
                  </span>
                )}
                {user.organization && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/30">
                    <Building className="size-4" />
                    {user.organization}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-6 py-3 bg-white text-violet-600 rounded-2xl font-semibold hover:bg-violet-50 transition-all shadow-xl flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="size-5" />
                  {t("profile.save")}
                </>
              ) : (
                <>
                  <Edit3 className="size-5" />
                  {t("profile.edit")}
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Хувийн мэдээлэл
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("profile.name")}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("profile.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("profile.phone")}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Утасны дугаар оруулах"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("profile.address")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Хаяг оруулах"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Role-specific fields */}
            {user.role === "student" ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t("profile.school")}
                  </label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t("profile.grade")}
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none transition-all"
                    >
                      <option value="">Анги сонгох</option>
                      {[9, 10, 11, 12].map((g) => (
                        <option key={g} value={g}>
                           {g}-р Анги
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("profile.organization")}
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Settings
          </h2>

          <div className="space-y-4">
            <button className="w-full px-6 py-4 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 rounded-2xl font-semibold hover:bg-violet-100 dark:hover:bg-violet-950/50 transition-all text-left">
            Нууц үг солих
            </button>
            <button className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-left">
            Мэдэгдлийн тохиргоо
            </button>
            <button className="w-full px-6 py-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-2xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-all text-left">
              Бүртгэл устгах
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
