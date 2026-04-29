import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Trophy, Medal, Award, Save, Plus, Trash2, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useOlympiads } from "../lib/tournament-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts@2.15.2";
import { getPlacementsByOlympiad, savePlacements } from "../lib/placements-api";
import { getStudents, Student} from "../services/studentService";
interface Result {
  studentId: string;
  score: number;
  rank?: number;
  olympiad_id: string
}

export function OrganizerResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getById } = useOlympiads();
  const { t } = useLanguage();
  
  const [results, setResults] = useState<Result[]>([]);
  const [newStudentID, setNewStudentID] = useState("");
  const [newScore, setNewScore] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const tournament = getById(id || "");
  const [students, setStudents] = useState<Student[]>([]);
  const [isManualRanking, setIsManualRanking] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/login");
    }
  }, [user, navigate]);


useEffect(() => {
  const load = async () => {
    if (!id) return;
    const data = await getPlacementsByOlympiad(id);

    setResults(data);
    setIsPublished(data.length > 0);
  };

  load();
}, [id]);
useEffect(() => {
  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  loadStudents();
}, []);
const getStudentName = (studentId: string) => {
  return students.find(s => s.id === studentId)?.name || "Unknown";
};

  if (!tournament) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Тэмцээн олдсонгүй
        </h1>
        <Link to="/organizer" className="text-violet-600 hover:text-violet-700">
          Буцах
        </Link>
      </div>
    );
  }

const handleAddResult = () => {
  if (!newStudentID || !newScore) return;

  const newResult: Result = {
    studentId: newStudentID, // now it's already ID
    score: parseFloat(newScore),
    olympiad_id: tournament.id
  };

  setResults([...results, newResult]);
  setNewStudentID("");
  setNewScore("");
};

  const handleDeleteResult = (studentId: string) => {
    setResults(results.filter(r => r.studentId !== studentId));
  };
const handleCalculateRanks = () => {
  if (isManualRanking) return; // ❗ skip auto if manual mode

  const sorted = [...results].sort((a, b) => b.score - a.score);

  let currentRank = 1;

  const ranked = sorted.map((result, index) => {
    if (index > 0 && result.score < sorted[index - 1].score) {
      currentRank++;
    }

    return {
      ...result,
      rank: currentRank,
    };
  });

  setResults(ranked);
};
const handleSaveResults = async () => {
  if (!id) return;

  const payload = results.map(r => ({
    id: Math.random().toString(36).substr(2, 9), 
    OlympiadId: id,
    StudentId: r.studentId,
    Score: r.score,
    Ranking: r.rank ?? null, 
  }));

  await savePlacements(payload);

  alert("Амжилттай хадгаллаа!");
};

  const handlePublishResults = async () => {
  if (results.length === 0) {
    alert("Үр дүн оруулна уу!");
    return;
  }

   const sorted = [...results].sort((a, b) => b.score - a.score);

  let currentRank = 1;

  const ranked = sorted.map((r, i) => {
    if (i > 0 && r.score < sorted[i - 1].score) {
      currentRank++;
    }

    return {
      ...r,
      rank: currentRank,
    };
  });

  setResults(ranked);
  const payload = ranked.map(r => ({
      id: crypto.randomUUID(),
       OlympiadId: id,
    StudentId: r.studentId,
    Score: r.score,
    Ranking: r.rank ?? null,

  }));

  await savePlacements(payload);

  setIsPublished(true);

  alert("Үр дүн амжилттай зарлагдлаа!");
};
  // Chart data
const chartData = results
  .slice(0, 10)
  .sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity))
  .map(r => {
  const student = students.find(s => s.id === r.studentId);

    return {
      name: student?.name || "Unknown",
      score: r.score,
      rank: r.rank || 0,
    };
  });

  const scoreDistribution = [
    { name: "90-100", value: results.filter(r => r.score >= 90).length, color: "#22c55e" },
    { name: "80-89", value: results.filter(r => r.score >= 80 && r.score < 90).length, color: "#3b82f6" },
    { name: "70-79", value: results.filter(r => r.score >= 70 && r.score < 80).length, color: "#f59e0b" },
    { name: "60-69", value: results.filter(r => r.score >= 60 && r.score < 70).length, color: "#ef4444" },
    { name: "< 60", value: results.filter(r => r.score < 60).length, color: "#6b7280" },
  ].filter(item => item.value > 0);

  const averageScore = results.length > 0
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2)
    : "0";

  const getMedalIcon = (rank?: number) => {
    if (!rank) return null;
    if (rank === 1) return <Trophy className="size-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="size-6 text-gray-600" />;
    if (rank === 3) return <Award className="size-6 text-amber-600" />;
    return null;
  };

  const getMedalColor = (rank?: number) => {
    if (!rank) return "";
    if (rank === 1) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    if (rank === 2) return "bg-silver-600 dark:bg-silver-50/20 border-silver-300 dark:border-silver-100";
    if (rank === 3) return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/organizer"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Буцах
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {tournament.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Үр дүн оруулах ба зарлах
              </p>
            </div>
            
            {isPublished && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-2xl border border-green-200 dark:border-green-800">
                <TrendingUp className="size-5" />
                <span className="font-semibold">Зарлагдсан</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-violet-100 dark:border-violet-900"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="size-8 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {results.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Нийт оролцогч
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-yellow-100 dark:border-yellow-900"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="size-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {results.filter(r => r.rank === 1).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              1-р байр
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-900"
          >
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="size-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {averageScore}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Дундаж оноо
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-100 dark:border-green-900"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {results.length > 0 ? Math.max(...results.map(r => r.score)) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Хамгийн өндөр оноо
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Add Result Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-violet-100 dark:border-violet-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Үр дүн нэмэх
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Сурагчийн нэр
                  </label>
                 <select
  value={newStudentID}
  onChange={(e) => setNewStudentID(e.target.value)}
  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl"
>
  <option value="">Сурагч сонгох</option>
  {students.map((s) => (
  <option key={s.id} value={s.id}>
  {s.name} ({s.id})
</option>
  ))}
</select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Оноо
                  </label>
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    placeholder="0-100"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  />
                </div>

                <button
                  onClick={handleAddResult}
                  disabled={!newStudentID || !newScore}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="size-5" />
                  Нэмэх
                </button>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <button
                    onClick={handleCalculateRanks}
                    disabled={results.length === 0}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Байр тооцоолох
                  </button>
<div className="flex gap-2">
  <button
    onClick={() => setIsManualRanking(false)}
    className={`w-1/2 py-2 rounded-xl font-semibold ${
      !isManualRanking ? "bg-blue-600 text-white" : "bg-gray-200"
    }`}
  >
    Автомат
  </button>

  <button
    onClick={() => setIsManualRanking(true)}
    className={`w-1/2 py-2 rounded-xl font-semibold ${
      isManualRanking ? "bg-purple-600 text-white" : "bg-gray-200"
    }`}
  >
    Гараар
  </button>
</div>
                  <button
                    onClick={handleSaveResults}
                    disabled={results.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="size-5" />
                    Хадгалах
                  </button>

                  <button
                    onClick={handlePublishResults}
                    disabled={results.length === 0 || isPublished}
                    className="w-full px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublished ? "Зарлагдсан" : "Үр дүн зарлах"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-violet-100 dark:border-violet-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Оролцогчдын жагсаалт ({results.length})
              </h2>

              <div className="overflow-x-auto">
                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="size-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Үр дүн оруулаагүй байна
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results
                      .sort((a, b) => (a.rank || Infinity) - (b.rank || Infinity))
                      .map((result, index) => {
                        const student = students.find(s => s.id === result.studentId)
return(
                        <motion.div
                          key={result.studentId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-xl border ${
                            getMedalColor(result.rank) || "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            {isManualRanking ? (
  <input
    type="number"
    value={result.rank || ""}
    onChange={(e) => {
      const value = parseInt(e.target.value);

      setResults(prev =>
        prev.map(r =>
          r.studentId === result.studentId
            ? { ...r, rank: value }
            : r
        )
      );
    }}
    className="w-16 px-2 py-1 border rounded-lg"
  />
) : (
  result.rank && (
    <div className="flex items-center gap-2 min-w-[60px]">
      {getMedalIcon(result.rank)}
      <span className="text-lg font-bold">
        #{result.rank}
      </span>
    </div>
  )
)}
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {student?.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ID: {result.studentId}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {result.score}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                оноо
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteResult(result.studentId)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        </motion.div>
                      )})}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart - Top 10 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-violet-100 dark:border-violet-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Эхний 10 оролцогч
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '0.75rem',
                      color: '#f3f4f6'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#9ca3af' }} />
                  <Bar dataKey="score" fill="#8b5cf6" name="Оноо" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Score Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-violet-100 dark:border-violet-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Оноо ны хуваарилалт
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry : any) => `${entry.name}: ${entry.value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '0.75rem',
                      color: '#f3f4f6'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}