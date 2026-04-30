import { useState, useMemo} from "react";
import { Link } from "react-router";
import { Trophy, Users, Award, Zap, Shield, Bell, ArrowRight, CheckCircle2, Sparkles, GraduationCap, Moon, Sun } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { motion } from "motion/react";
import { useEvents } from "../lib/event-context";
import { transformEvents, buildEventMap, dateKey } from "../utils/calendar";

import logo from "figma:asset/logopurple.png";

const CATS = [
  { id: "math", label: "Математик", color: "#7F77DD", bg: "#EEEDFE", text: "#3C3489" },
  { id: "phys", label: "Физик",     color: "#1D9E75", bg: "#E1F5EE", text: "#085041" },
  { id: "chem", label: "Химийн",   color: "#D85A30", bg: "#FAECE7", text: "#4A1B0C" },
  { id: "cs",   label: "Компьютерийн",   color: "#378ADD", bg: "#E6F1FB", text: "#0C447C" },
  { id: "bio",  label: "Биологи",     color: "#639922", bg: "#EAF3DE", text: "#27500A" },
];

const WEEKDAYS = ["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"];
const MONTHS = [
  "1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар",
  "7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар",
];

function OlympiadCalendar() {
  const [selectedKey, setSelectedKey] = useState(null);
  const { events: dbEvents, loading } = useEvents();
  const events = useMemo(() => transformEvents(dbEvents), [dbEvents]);
  const eventMap = useMemo(() => buildEventMap(events), [events]);
  const now = new Date();
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  const firstDay    = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const daysInPrev  = new Date(cursor.getFullYear(), cursor.getMonth(), 0).getDate();
  const total       = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const cells = [];
  for (let i = 0; i < total; i++) {
    let d; let inMonth = true;
    if (i < firstDay) {
      d = new Date(cursor.getFullYear(), cursor.getMonth() - 1, daysInPrev - firstDay + i + 1);
      inMonth = false;
    } else if (i < firstDay + daysInMonth) {
      d = new Date(cursor.getFullYear(), cursor.getMonth(), i - firstDay + 1);
    } else {
      d = new Date(cursor.getFullYear(), cursor.getMonth() + 1, i - firstDay - daysInMonth + 1);
      inMonth = false;
    }
    cells.push({ d, inMonth });
  }

  const selectedEvents = selectedKey ? (eventMap[selectedKey] || []) : [];

  return (
    <section className="relative py-24 px-8 bg-violet-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Олимпиадуудын календарь
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Ирэх саруудад болох олимпиадуудыг шалгана уу
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-violet-200/50 dark:border-violet-800/50 p-6 lg:p-10 shadow-xl shadow-violet-500/10"
        >
          {/* Nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => { setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)); setSelectedKey(null); }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-800 text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="size-4" /> Өмнөх
            </button>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </span>
            <button
              onClick={() => { setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)); setSelectedKey(null); }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-800 text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors text-sm font-medium"
            >
              Дараах <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs text-gray-400 dark:text-gray-500 py-1">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map(({ d, inMonth }, i) => {
              const k      = dateKey(d);
              const evts   = eventMap[k] || [];
              const isToday = dateKey(d) === dateKey(now);
              const isSel  = k === selectedKey;
              const hasEvt = evts.length > 0;

              return (
                <div
                  key={i}
                  onClick={() => hasEvt && setSelectedKey(isSel ? null : k)}
                  className={`
                    min-h-[52px] rounded-xl p-1.5 transition-all duration-150 relative
                    ${inMonth ? "bg-gray-50 dark:bg-gray-700/50" : ""}
                    ${isToday ? "ring-2 ring-violet-400 dark:ring-violet-500" : ""}
                    ${hasEvt ? "cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-900/40" : ""}
                    ${isSel  ? "ring-2 ring-violet-600 dark:ring-violet-400 bg-violet-50 dark:bg-violet-900/40" : ""}
                  `}
                >
                  <span className={`text-xs font-medium ${inMonth ? "text-gray-700 dark:text-gray-200" : "text-gray-300 dark:text-gray-600"}`}>
                    {d.getDate()}
                  </span>
                  <div className="flex flex-wrap gap-0.5 mt-0.5">
                    {evts.slice(0, 4).map((e, j) => {
                      const cat = CATS.find(c => c.id === e.cat);
                      return <div key={j} className="w-2 h-2 rounded-full" style={{ background: cat?.color }} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-violet-100 dark:border-violet-900">
            {CATS.map(c => (
              <div key={c.id} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.label}
              </div>
            ))}
          </div>

          {/* Event detail panel */}
          {selectedEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 rounded-2xl border border-violet-200/60 dark:border-violet-800/60 overflow-hidden"
            >
              <div className="px-4 py-2.5 bg-violet-50 dark:bg-violet-900/30 text-xs text-violet-600 dark:text-violet-300 font-medium border-b border-violet-200/60 dark:border-violet-800/60">
                {WEEKDAYS[selectedEvents[0].date.getDay()]}, {MONTHS[selectedEvents[0].date.getMonth()]} {selectedEvents[0].date.getDate()} — {selectedEvents.length} event{selectedEvents.length > 1 ? "s" : ""}
              </div>
              {selectedEvents.map((e, i) => {
                const cat = CATS.find(c => c.id === e.cat);
                return (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 border-violet-100 dark:border-violet-900/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat?.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{e.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{e.venue}</p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: cat?.bg, color: cat?.text }}>{cat?.label}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Fee: {e.fee}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{e.slots} slots</span>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="flex-shrink-0 text-xs px-3 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Register
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          )}

          {!selectedKey && (
            <p className="mt-5 text-center text-sm text-gray-400 dark:text-gray-500">
              Сонирхсон өдрийг сонгоод дэлгэрэнгүй мэдээллийг хараарай
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------
export function Home() {
  const { user } = useAuth();
  const { t }    = useLanguage();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen w-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen grid lg:grid-cols-2 gap-0 overflow-hidden">

        {/* Dark mode toggle button — floats top-right over hero */}
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full
                     bg-violet-100 dark:bg-gray-700
                     text-violet-600 dark:text-yellow-400
                     hover:bg-violet-200 dark:hover:bg-gray-600
                     shadow-md transition-all duration-300"
        >
          {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        {/* Left — Logo */}
        <div className="p-8 relative flex items-center justify-center bg-white dark:bg-gray-900 lg:p-16 transition-colors duration-300">
          <img src={logo} alt="Logo" className="size-150" />
        </div>

        {/* Right — Content */}
        <div className="relative flex items-center p-8 lg:p-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-2xl mx-auto lg:mx-0 space-y-8 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-purple-600 bg-clip-text text-transparent">
                  {t("home.title")}
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("home.subtitle")}
              </p>
              <p className="text-base lg:text-lg text-gray-500 dark:text-gray-400">
                {t("home.description")}
              </p>
            </motion.div>

            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold overflow-hidden shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("nav.signup")}
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  to={user ? (user.role === "organizer" ? "/organizer" : "/student") : "/login"}
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border-2 border-violet-300 dark:border-violet-700 rounded-2xl font-semibold hover:bg-white dark:hover:bg-gray-800 hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-300 shadow-lg"
                >
                  {t("nav.login")}
                </Link>
              </motion.div>
            )}

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  to={user.role === "organizer" ? "/organizer" : "/student"}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
                >
                  {t("nav.dashboard")}
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-violet-200/50 dark:border-violet-800/50"
            >
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">1,200+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Сурагчид</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">45+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Олимпиадууд</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">25+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Зохион Байгуулагчид</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Olympiad Calendar ─────────────────────────────────────────────── */}
      <OlympiadCalendar />

      {/* ── Choose Your Path ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-purple-600 bg-clip-text text-transparent">
                Өөрийн замаа сонго
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Student card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="relative bg-purple-600 p-[2px] rounded-3xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20" />
                  <div className="relative z-10">
                    <div className="inline-flex p-4 bg-purple-600 rounded-2xl shadow-lg shadow-violet-500/30 mb-6">
                      <Users className="size-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t("home.studentTitle")}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t("home.studentDesc")}</p>
                    <ul className="space-y-3 mb-8">
                      {["Browse 45+ tournaments", "Easy registration process", "Track your achievements"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="size-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {!user && (
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all group"
                      >
                        Get Started
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Organizer card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative lg:mt-12"
            >
              <div className="relative bg-purple-600 p-[2px] rounded-3xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-400 rounded-full opacity-20" />
                  <div className="relative z-10">
                    <div className="inline-flex p-4 bg-purple-600 rounded-2xl mb-6">
                      <Trophy className="size-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t("home.organizerTitle")}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t("home.organizerDesc")}</p>
                    <ul className="space-y-3 mb-8">
                      {["Create unlimited events", "Manage registrations", "Analytics dashboard"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="size-5 text-purple-600 dark:text-fuchsia-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {!user && (
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-500/40 transition-all group"
                      >
                        Get Started
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-8 bg-violet-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {t("home.features")}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap,    title: t("home.feature1"), desc: t("home.feature1Desc"), color: "purple-600" },
              { icon: Shield, title: t("home.feature2"), desc: t("home.feature2Desc"), color: "purple-600" },
              { icon: Bell,   title: t("home.feature3"), desc: t("home.feature3Desc"), color: "purple-600" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl border border-violet-200/50 dark:border-violet-800/50 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-4 bg-${feature.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
