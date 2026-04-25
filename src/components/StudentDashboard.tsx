import { useState, useEffect } from "react";
import { useNavigate, Link, Router } from "react-router";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  CheckCircle,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../lib/auth-context";
import { useOlympiads } from "../lib/tournament-context";
import { useLanguage } from "../lib/language-context";
import { PaymentModal } from "./PaymentModal";
import { motion } from "motion/react";
import { updateRevenue } from "../services/organizerService";

export function StudentDashboard() {
  const { user } = useAuth();
  const { olympiads, register, unregister, registrations } = useOlympiads();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] =
    useState<"available" | "registered">("available");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOlympiad, setSelectedOlympiad] = useState<{
    id: string;
    title: string;
    fee: number;
  } | null>(null);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [selectedUnregisterId, setSelectedUnregisterId] = useState<string | null>(null);

  /** AUTH GUARD */
  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "student") return null;

  const myRegistrations = olympiads.filter((o) =>
    registrations.some(
      (r) => r.olympiad_id === o.id && r.student_id === user.id
    )
  );

  /** FILTER */
  const filteredOlympiads = olympiads.filter((o) => {
    const matchesSearch =
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || o.category === categoryFilter;

    if (activeTab === "registered") {
      return registrations.some(
        (r) => r.olympiad_id === o.id && r.student_id === user.id
      );
    }
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...Array.from(new Set(olympiads.map((o) => o.category))),
  ];

  /** REGISTER FLOW (PAYMENT FIRST) */
  const handleRegister = (olympiadId: string) => {
    const o = olympiads.find((x) => x.id === olympiadId);
    if (!o) return;

    setSelectedOlympiad({
      id: o.id,
      title: o.title,
      fee: o.registration_fee,
    });

    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    if (!selectedOlympiad || !user) return;

    await register(selectedOlympiad.id, user.id);

    setShowPaymentModal(false);
    setSelectedOlympiad(null);
  };

  const handleUnregister = async (id: string) => {
    const olympiad = olympiads.find((o) => o.id === id);
    if (olympiad) {
      await updateRevenue(olympiad.organizer_id, -(olympiad.registration_fee ?? 0));
    }
    await unregister(id, user.id);

  };
  const handleUnregisterClick = (id: string) => {
    setSelectedUnregisterId(id);
    setShowUnregisterModal(true);
  };
  const confirmUnregister = async () => {
    if (!selectedUnregisterId || !user) return;

    const olympiad = olympiads.find(o => o.id === selectedUnregisterId);

    if (olympiad) {
      await updateRevenue(
        olympiad.organizer_id,
        -(olympiad.registration_fee ?? 0)
      );
    }

    await unregister(selectedUnregisterId, user.id);

    setShowUnregisterModal(false);
    setSelectedUnregisterId(null);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <Sparkles className="size-4" />
                Student Portal
              </div>

              <h1 className="text-4xl font-bold text-white">
                Welcome, {user.name}
              </h1>

              <p className="text-purple-100">
                {user.school} • Grade {user.grade}
              </p>
            </div>

            <Link
              to="/achievements"
              className="px-5 py-3 bg-white text-purple-700 rounded-xl font-semibold"
            >
              <Award className="inline size-5 mr-2" />
              Achievements
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mt-8 text-white">
            <div>
              <div className="text-2xl font-bold">{olympiads.length}</div>
              <div className="text-sm opacity-80">Total Olympiads</div>
            </div>

            <div>
              <div className="text-2xl font-bold">{myRegistrations.length}</div>
              <div className="text-sm opacity-80">My Registrations</div>
            </div>

            <div>
              <div className="text-2xl font-bold">
                {
                  myRegistrations.filter(
                    (o) => new Date(o.date) > new Date()
                  ).length
                }
              </div>
              <div className="text-sm opacity-80">Upcoming</div>
            </div>

            <div>
              <div className="text-2xl font-bold">
                {
                  myRegistrations.filter(
                    (o) => new Date(o.date) <= new Date()
                  ).length
                }
              </div>
              <div className="text-sm opacity-80">Completed</div>
            </div>
          </div>
        </motion.div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search olympiads..."
            className="flex-1 p-3 rounded-xl border"
          />
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-12 pr-8 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none min-w-[200px] transition-all"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === "available"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab("registered")}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === "registered"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
            >
              My Events ({myRegistrations.length})
            </button>
          </div>
        </div>




        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOlympiads.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Trophy className="size-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {activeTab === "registered" ? t("student.noRegistrations") : t("student.noTournaments")}
              </p>
            </div>
          ) : (
            filteredOlympiads.map((olympiad, index) => {
              const isRegistered = registrations.some(
                (r) =>
                  r.olympiad_id === olympiad.id &&
                  r.student_id === user.id
              );
              const isPast = new Date(olympiad.date) < new Date();

              return (
                <motion.div
                  key={olympiad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/tournament/${olympiad.id}`)}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
                >
                  {/* Olympiad Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${isRegistered
                      ? "from-green-500 to-emerald-600"
                      : "from-violet-500 to-purple-600"
                      }`}>
                      <Trophy className="size-6 text-white" />
                    </div>
                    {isRegistered && (
                      <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold flex items-center gap-1">
                        <CheckCircle className="size-4" />
                        Registered
                      </div>
                    )}
                  </div>

                  {/* Olympiad Info */}
                  <Link to={`/tournament/${olympiad.id}`} className="block mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {olympiad.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {olympiad.description}
                    </p>
                  </Link>

                  {/* Olympiad Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{new Date(olympiad.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{olympiad.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Users className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{olympiad.registered_count} participants</span>
                    </div>
                    {olympiad.preparation_material && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <Award className="size-4 text-violet-600 dark:text-violet-400" />
                        <a
                          href={olympiad.preparation_material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          {olympiad.preparation_material.fileName || "View Preparation Material"}
                        </a>
                      </div>
                    )}

                  </div>
                  {/* Fee and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-violet-200/50 dark:border-violet-800/50">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ₮{olympiad.registration_fee.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Registration fee</div>
                    </div>

                    {isRegistered ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnregisterClick(olympiad.id);
                        }}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRegister(olympiad.id) }}
                        disabled={isPast || olympiad.registered_count >= olympiad.max_participants}
                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 transition-all"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
      {/* PAYMENT */}
      {showPaymentModal && selectedOlympiad && (
        <PaymentModal
          tournamentTitle={selectedOlympiad.title}
          fee={selectedOlympiad.fee}
          onConfirm={handlePaymentConfirm}
          onClose={() => setShowPaymentModal(false)}
          olympiadId={selectedOlympiad.id}
          organizerId={olympiads.find(o => o.id === selectedOlympiad.id)?.organizer_id || ""}
        />
      )}
      {showUnregisterModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Бүртгэл цуцлах уу?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Та энэ тэмцээнээс бүртгэлээ цуцлахдаа итгэлтэй байна уу?
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmUnregister}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl"
              >
                Тийм
              </button>

              <button
                onClick={() => setShowUnregisterModal(false)}
                className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
              >
                Үгүй
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)}
    </div> 
    );
  }
  
