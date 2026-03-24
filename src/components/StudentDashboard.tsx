import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Trophy, Calendar, MapPin, Users, Search, Filter, CheckCircle, Banknote, Award, TrendingUp, Sparkles, Clock, ChevronRight } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useTournaments } from "../lib/tournament-context";
import { useLanguage } from "../lib/language-context";
import { PaymentModal } from "./PaymentModal";
import { motion } from "motion/react";

export function StudentDashboard() {
  const { user } = useAuth();
  const { tournaments, getStudentRegistrations, registerForTournament, unregisterFromTournament } = useTournaments();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"available" | "registered">("available");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<{ id: string; title: string; fee: number } | null>(null);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "student") {
    return null;
  }

  const myRegistrations = getStudentRegistrations(user.id);

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || tournament.category === categoryFilter;
    
    if (activeTab === "registered") {
      return myRegistrations.some(r => r.id === tournament.id);
    }
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(tournaments.map(t => t.category)))];

  const handleRegister = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (tournament) {
      setSelectedTournament({
        id: tournament.id,
        title: tournament.title,
        fee: tournament.registrationFee
      });
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = () => {
    if (selectedTournament) {
      const success = registerForTournament(selectedTournament.id, user.id);
      if (!success) {
        alert(t("student.registrationFailed"));
      }
      setShowPaymentModal(false);
      setSelectedTournament(null);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedTournament(null);
  };

  const handleUnregister = (tournamentId: string) => {
    if (confirm(t("student.confirmUnregister"))) {
      unregisterFromTournament(tournamentId, user.id);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-8 lg:p-12 shadow-lg border border-purple-500"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm mb-2">
                <Sparkles className="size-4" />
                <span>Student Portal</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                {t("student.welcome")}, {user.name}!
              </h1>
              <p className="text-purple-100 text-lg">
                {user.school} • Grade {user.grade}
              </p>
            </div>
            
            <Link
              to="/achievements"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all"
            >
              <Award className="size-5" />
              <span>{t("nav.achievements")}</span>
              <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">{tournaments.length}</div>
              <div className="text-purple-100 text-sm">Available Events</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">{myRegistrations.length}</div>
              <div className="text-purple-100 text-sm">My Registrations</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">
                {myRegistrations.filter(r => new Date(r.date) > new Date()).length}
              </div>
              <div className="text-purple-100 text-sm">Upcoming</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">
                {myRegistrations.filter(r => new Date(r.date) <= new Date()).length}
              </div>
              <div className="text-purple-100 text-sm">Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("student.searchTournaments")}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none min-w-[200px] transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("available")}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  activeTab === "available"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setActiveTab("registered")}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  activeTab === "registered"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                My Events ({myRegistrations.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tournaments Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Trophy className="size-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {activeTab === "registered" ? t("student.noRegistrations") : t("student.noTournaments")}
              </p>
            </div>
          ) : (
            filteredTournaments.map((tournament, index) => {
              const isRegistered = myRegistrations.some(r => r.id === tournament.id);
              const isPast = new Date(tournament.date) < new Date();
              
              return (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
                >
                  {/* Tournament Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                      isRegistered 
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

                  {/* Tournament Info */}
                  <Link to={`/tournament/${tournament.id}`} className="block mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {tournament.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {tournament.description}
                    </p>
                  </Link>

                  {/* Tournament Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Users className="size-4 text-violet-600 dark:text-violet-400" />
                      <span>{tournament.registrations.length} participants</span>
                    </div>
                  </div>

                  {/* Fee and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-violet-200/50 dark:border-violet-800/50">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ₮{tournament.registrationFee.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Registration fee</div>
                    </div>

                    {isRegistered ? (
                      <button
                        onClick={() => handleUnregister(tournament.id)}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(tournament.id)}
                        disabled={isPast || tournament.registrations.length >= tournament.maxParticipants}
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

      {/* Payment Modal */}
      {showPaymentModal && selectedTournament && (
        <PaymentModal
          tournamentTitle={selectedTournament.title}
          fee={selectedTournament.fee}
          onConfirm={handlePaymentConfirm}
          onClose={handlePaymentClose}
        />
      )}
    </div>
  );
}