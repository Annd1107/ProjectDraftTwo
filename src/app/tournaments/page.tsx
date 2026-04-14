"use client";

import { useState } from "react";
import { Trophy, Calendar, MapPin, Users, Search, Filter, SlidersHorizontal, Grid3x3, List, Banknote, Tag } from "lucide-react";
import { useOlympiads } from "../../lib/tournament-context";
import { useAuth } from "../../lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TournamentsPage() {
  const { olympiads } = useOlympiads();
  const { user } = useAuth();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceFilter, setPriceFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(olympiads.map(o => o.category)))];

  // Filter and sort tournaments
  let filteredTournaments = olympiads.filter((olympiad) => {
    const matchesSearch = olympiad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         olympiad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || olympiad.category === categoryFilter;
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && olympiad.registration_fee === 0) ||
                        (priceFilter === "paid" && olympiad.registration_fee > 0);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort tournaments
  filteredTournaments = filteredTournaments.sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return b.registered_count - a.registered_count;
      case "price-low":
        return a.registration_fee - b.registration_fee;
      case "price-high":
        return b.registration_fee - a.registration_fee;
      default:
        return 0;
    }
  });

  const handleTournamentClick = (tournamentId: string) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/tournament/${tournamentId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Trophy className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Бүх тэмцээнүүд
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Тэмцээнүүд
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {filteredTournaments.length} тэмцээн бэлэн байна
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Тэмцээн хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">Бүх ангилал</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">Бүх төлбөр</option>
                <option value="free">Үнэгүй</option>
                <option value="paid">Төлбөртэй</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="date">Огноогоор</option>
                <option value="popular">Алдартай</option>
                <option value="price-low">Үнэ: Бага → Өндөр</option>
                <option value="price-high">Үнэ: Өндөр → Бага</option>
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Grid3x3 className="size-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <List className="size-5" />
            </button>
          </div>
        </div>

        {/* Tournaments Grid/List */}
        {filteredTournaments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center border border-gray-200 dark:border-gray-700">
            <Trophy className="size-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Тэмцээн олдсонгүй
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Таны хайлтад тохирох тэмцээн байхгүй байна. Өөр хайлт хийнэ үү.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setPriceFilter("all");
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium"
            >
              Шүүлтийг цэвэрлэх
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => {
              const isFull = tournament.registered_count >= tournament.max_participants;
              const isPast = new Date(tournament.date) < new Date();
              const spotsLeft = tournament.max_participants - tournament.registered_count;

              return (
                <div
                  key={tournament.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleTournamentClick(tournament.id)}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {tournament.category}
                      </span>
                      {isFull && (
                        <span className="inline-block px-3 py-1 bg-red-500 rounded-full text-sm font-medium">
                          Дүүрсэн
                        </span>
                      )}
                      {!isFull && !isPast && spotsLeft <= 10 && (
                        <span className="inline-block px-3 py-1 bg-yellow-500 rounded-full text-sm font-medium">
                          {spotsLeft} сул орон
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                      {tournament.title}
                    </h3>
                    <p className="text-purple-100 text-sm line-clamp-2">
                      {tournament.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="size-4 flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(tournament.date).toLocaleDateString('mn-MN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="size-4 flex-shrink-0" />
                        <span className="text-sm truncate">{tournament.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="size-4 flex-shrink-0" />
                        <span className="text-sm">
                          {tournament.registered_count} / {tournament.max_participants}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <Banknote className="size-4 flex-shrink-0" />
                        <span className="font-bold">
                          {tournament.registration_fee === 0 
                            ? "Үнэгүй" 
                            : `${tournament.registration_fee.toLocaleString()}₮`
                          }
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((tournament.registered_count / tournament.max_participants) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Зохион байгуулагч: {tournament.organizer_name}
                    </div>

                    <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium group-hover:shadow-lg">
                      Дэлгэрэнгүй үзэх
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTournaments.map((tournament) => {
              const isFull = tournament.registered_count >= tournament.max_participants;
              const isPast = new Date(tournament.date) < new Date();
              const spotsLeft = tournament.max_participants - tournament.registered_count;

              return (
                <div
                  key={tournament.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => handleTournamentClick(tournament.id)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          {tournament.category}
                        </span>
                        {isFull && (
                          <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                            Дүүрсэн
                          </span>
                        )}
                        {!isFull && !isPast && spotsLeft <= 10 && (
                          <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                            {spotsLeft} сул орон
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {tournament.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {tournament.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          {new Date(tournament.date).toLocaleDateString('mn-MN')}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4" />
                          {tournament.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="size-4" />
                          {tournament.registered_count} / {tournament.max_participants}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right mb-4">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          {tournament.registration_fee === 0 
                            ? "Үнэгүй" 
                            : `${tournament.registration_fee.toLocaleString()}₮`
                          }
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Бүртгэлийн хураамж
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium whitespace-nowrap">
                        Дэлгэрэнгүй →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
