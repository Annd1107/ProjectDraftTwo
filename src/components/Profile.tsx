import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, School, GraduationCap, Building, Phone, MapPin, Save, ArrowLeft, Edit3, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";
import { updateStudent, deleteStudent } from "../services/studentService";
import { updateOrganizer } from "../services/organizerService";
import { supabase } from "../utils/supabase";
import { deleteOrganizer } from "../services/organizerService";


export function Firs(setFirst: React.Dispatch<React.SetStateAction<boolean>>) {
  return (<div onClick={() => setFirst(true)} className="flex items-center gap-2">
    <AlertCircle className="size-4 text-red-500" />
    Та энэ үйлдлийг хийх гэж байна. Үргэлжлүүлэхийн тулд дарна уу.
  </div>
  )
}
export function Tues(setSecond: React.Dispatch<React.SetStateAction<boolean>>) {
  return (<div onClick={() => setSecond(true)} className="flex items-center gap-2">
    <AlertCircle className="size-4 text-red-500" />
    Та энэ үйлдлийг хийх гэж байна. Үргэлжлүүлэхийн тулд дахин дарна уу.
  </div>
  )
}

export function Profile() {
  const { user, setUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);

  if (!user) {
    navigate("/login");
    return null;
  }

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    school: user.school || "",
    grade: user.grade || "",
    organization: user.organization || ""
  });
  // ─── Delete with double confirm ──────────────────────────────────────────
  const handleDelete = async () => {

    try {
      if (user.role === "student") {
        await deleteStudent(user.id);
      } else {
        await deleteOrganizer(user.id); // make sure you have this
      }
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Устгахад алдаа гарлаа");
    }
  };

  // ─── Change password (no email needed) ──────────────────────────────────
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = async () => {
    setPasswordError("");

    if (passwordData.newPass !== passwordData.confirm) {
      setPasswordError("Нууц үг таарахгүй байна");
      return;
    }

    if (passwordData.newPass.length < 6) {
      setPasswordError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
      return;
    }

    const table = user.role === "student" ? "Students" : "Organizers";

    // verify current password
    const { data, error } = await supabase
      .from(table)
      .select("id")
      .eq("id", user.id)
      .eq("password", passwordData.current)
      .maybeSingle();

    if (error || !data) {
      setPasswordError("Одоогийн нууц үг буруу байна");
      return;
    }

    // update password
    await supabase
      .from(table)
      .update({ password: passwordData.newPass })
      .eq("id", user.id);

    setShowPasswordModal(false);
    setPasswordData({ current: "", newPass: "", confirm: "" });
    alert("Нууц үг амжилттай солигдлоо!");
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      let updatedUser;

      if (user.role === "student") {
        updatedUser = await updateStudent(user.id, {
          name: formData.name,
          email: formData.email,
          school: formData.school,
          grade: Number(formData.grade)
        });
      } else {
        updatedUser = await updateOrganizer(user.id, {
          name: formData.name,
          email: formData.email,
          organization: formData.organization
        });
      }

      const newUser = { ...user, ...updatedUser };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
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
          className="relative bg-gradient-to-br   from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-2xl shadow-violet-500/30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="size-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl">
                <User className="size-16 text-white" />
              </div>
              <div className={`absolute -bottom-2 -right-2 p-2 rounded-full ${user.role === "student"
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
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${user.role === "student"
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
              className="w-full sm:w-auto px-6 py-3  bg-white text-violet-600 rounded-2xl font-semibold hover:bg-violet-50 transition-all shadow-xl flex items-center gap-2"
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
            {/* Change Password Button */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full px-6 py-4 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 rounded-2xl font-semibold hover:bg-violet-100 transition-all text-left"
            >
              Нууц үг солих
            </button>

            {/* ✅ Double confirm delete */}
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteStep(1);
              }}
              className="w-full px-6 py-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-2xl font-semibold hover:bg-red-100 transition-all text-left"
            >
              Бүртгэл устгах
            </button>
          </div>

          {/* ─── Password Modal ────────────────────────────────────────────────── */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Нууц үг солих
                </h3>

                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Одоогийн нууц үг"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full border p-3 rounded-xl dark:bg-gray-900 dark:border-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Шинэ нууц үг"
                    value={passwordData.newPass}
                    onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                    className="w-full border p-3 rounded-xl dark:bg-gray-900 dark:border-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Шинэ нууц үг давтах"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full border p-3 rounded-xl dark:bg-gray-900 dark:border-gray-700"
                  />

                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold"
                  >
                    Хадгалах
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError("");
                      setPasswordData({ current: "", newPass: "", confirm: "" });
                    }}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-semibold"
                  >
                    Цуцлах
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="size-6 text-red-500" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Бүртгэл устгах
                    </h3>
                    <p className="text-sm text-gray-500">
                      Энэ үйлдлийг буцаах боломжгүй.
                    </p>
                  </div>
                </div>

                {deleteStep === 1 ? (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Та өөрийн бүртгэлийг устгах гэж байна.
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-semibold"
                      >
                        Цуцлах
                      </button>

                      <button
                        onClick={() => setDeleteStep(2)}
                        className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
                      >
                        Үргэлжлүүлэх
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-red-600 dark:text-red-400 font-medium mb-6">
                      Та итгэлтэй байна уу? Энэ үйлдлийг сэргээх боломжгүй.
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteStep(1)}
                        className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-semibold"
                      >
                        Буцах
                      </button>

                      <button
                        onClick={handleDelete}
                        className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
                      >
                        Устгах
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
