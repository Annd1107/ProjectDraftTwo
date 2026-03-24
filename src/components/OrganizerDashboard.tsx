import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Calendar, MapPin, Users, Trophy, Edit, Trash2, FileText, Upload, BarChart3, TrendingUp, DollarSign, X, Sparkles } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useTournaments } from "../lib/tournament-context";
import { useLanguage } from "../lib/language-context";
import { motion, AnimatePresence } from "motion/react";

export function OrganizerDashboard() {
  const { user } = useAuth();
  const { getOrganizerTournaments, addTournament, deleteTournament } = useTournaments();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [registrationFee, setRegistrationFee] = useState(10000);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "organizer") {
    return null;
  }

  const myTournaments = getOrganizerTournaments(user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tournamentData: any = {
      title,
      description,
      category,
      date,
      location,
      maxParticipants,
      registrationFee,
      organizerId: user.id,
      organizerName: user.name,
      organizerOrganization: user.organization || "",
    };

    if (pdfFile) {
      tournamentData.preparationMaterial = {
        fileName: pdfFile.name,
        fileUrl: URL.createObjectURL(pdfFile),
      };
    }

    addTournament(tournamentData);

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setDate("");
    setLocation("");
    setMaxParticipants(100);
    setRegistrationFee(10000);
    setPdfFile(null);
    setPdfFileName("");
    setShowAddForm(false);
  };

  const handleDelete = (tournamentId: string) => {
    if (confirm(t("organizer.confirmDelete"))) {
      deleteTournament(tournamentId);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfFileName(file.name);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const categories = [
    { mn: "Математик", en: "Mathematics" },
    { mn: "Физик", en: "Physics" },
    { mn: "Хими", en: "Chemistry" },
    { mn: "Биологи", en: "Biology" },
    { mn: "Англи хэл", en: "English" },
    { mn: "Программчлал", en: "Programming" },
    { mn: "Бусад", en: "Other" },
  ];

  // Calculate stats
  const totalParticipants = myTournaments.reduce((sum, t) => sum + t.registrations.length, 0);
  const totalRevenue = myTournaments.reduce((sum, t) => sum + (t.registrations.length * t.registrationFee), 0);
  const upcomingEvents = myTournaments.filter(t => new Date(t.date) > new Date()).length;

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
                <span>Organizer Portal</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                {t("organizer.welcome")}, {user.name}!
              </h1>
              <p className="text-purple-100 text-lg">
                {user.organization || "Independent Organizer"}
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all"
            >
              <Plus className="size-5" />
              <span>Create Event</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="size-5 text-white" />
                <span className="text-white/80 text-sm">Total Events</span>
              </div>
              <div className="text-3xl font-bold text-white">{myTournaments.length}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="size-5 text-white" />
                <span className="text-white/80 text-sm">Upcoming</span>
              </div>
              <div className="text-3xl font-bold text-white">{upcomingEvents}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="size-5 text-white" />
                <span className="text-white/80 text-sm">Participants</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalParticipants}</div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="size-5 text-white" />
                <span className="text-white/80 text-sm">Revenue</span>
              </div>
              <div className="text-3xl font-bold text-white">₮{(totalRevenue / 1000).toFixed(0)}K</div>
            </div>
          </div>
        </motion.div>

        {/* Events Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            My Events ({myTournaments.length})
          </h2>

          {myTournaments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-16 text-center border border-violet-200/50 dark:border-violet-800/50"
            >
              <Trophy className="size-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first tournament to get started
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
              >
                <Plus className="size-5" />
                <span>Create First Event</span>
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {myTournaments.map((tournament, index) => {
                const isPast = new Date(tournament.date) < new Date();
                const participationRate = (tournament.registrations.length / tournament.maxParticipants) * 100;
                
                return (
                  <motion.div
                    key={tournament.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                        isPast ? "from-gray-400 to-gray-600" : "from-fuchsia-500 to-purple-600"
                      }`}>
                        <Trophy className="size-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(tournament.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {tournament.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {tournament.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="size-4 text-purple-600 dark:text-purple-400" />
                        <span>{new Date(tournament.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="size-4 text-purple-600 dark:text-purple-400" />
                        <span>{tournament.location}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Participants</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {tournament.registrations.length}/{tournament.maxParticipants}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${participationRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center justify-between pt-4 border-t border-violet-200/50 dark:border-violet-800/50">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                          ₮{((tournament.registrations.length * tournament.registrationFee) / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isPast 
                          ? "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      }`}>
                        {isPast ? "Completed" : "Active"}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Tournament Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Create New Event
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    placeholder="e.g., National Mathematics Olympiad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
                    placeholder="Describe your event..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.en} value={cat.en}>
                          {cat.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    placeholder="e.g., Ulaanbaatar, Mongolia"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(Number(e.target.value))}
                      min="1"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Registration Fee (₮)
                    </label>
                    <input
                      type="number"
                      value={registrationFee}
                      onChange={(e) => setRegistrationFee(Number(e.target.value))}
                      min="0"
                      step="1000"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Preparation Material (PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <Upload className="size-5 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {pdfFileName || "Upload PDF file"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}