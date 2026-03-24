import { useLanguage } from "../lib/language-context";
import { Mail, Phone, Users, Trophy, Target, BookOpen, Award } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/f903ce71512caff8e98ba718ecc02ebdf4aae725.png";

const mathImg = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl dark:opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl dark:opacity-50"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm mb-4">
              <Trophy className="size-4" />
              <span>About TemtseenPortal</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 break-words px-4">
              {t("about.title")}
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed px-4 break-words">
              {t("about.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-semibold mb-6">
                <Target className="size-4" />
                <span>Our Mission</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t("about.mission")}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {t("about.missionDesc")}
              </p>

              <div className="space-y-4">
                {[
                  "Empower students to reach their full potential",
                  "Provide organizers with powerful tools",
                  "Build a thriving academic community",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                      <Award className="size-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20">
                <img
                  src={mathImg}
                  alt="Mathematics olympiad"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/80 to-transparent"></div>
                
                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/30">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">1.2K+</div>
                    <div className="text-white/80 text-xs sm:text-sm">Students</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/30">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">45+</div>
                    <div className="text-white/80 text-xs sm:text-sm">Events</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/30">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">25+</div>
                    <div className="text-white/80 text-xs sm:text-sm">Organizers</div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
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
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: "Excellence",
                desc: "We strive for the highest standards in everything we do",
                color: "from-violet-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Community",
                desc: "Building strong connections between students and organizers",
                color: "from-fuchsia-500 to-purple-600"
              },
              {
                icon: BookOpen,
                title: "Innovation",
                desc: "Constantly improving our platform with new features",
                color: "from-violet-500 to-fuchsia-600"
              },
              {
                icon: Award,
                title: "Achievement",
                desc: "Celebrating and rewarding student success",
                color: "from-purple-500 to-violet-600"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/10 transition-all duration-300"
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${value.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="size-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-8 bg-white dark:bg-gray-900">
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
                Built for Mongolia
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              TemtseenPortal is proudly developed in Mongolia, for Mongolian students and educators
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-12 lg:p-16 overflow-hidden shadow-2xl shadow-violet-500/30"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl dark:opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl dark:opacity-50"></div>
            
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex p-6 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <img src={logo} alt="Logo" className="size-20" />
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Join Our Growing Community
              </h3>
              
              <p className="text-xl text-violet-100 max-w-2xl mx-auto">
                Whether you're a student looking to compete or an organizer wanting to host events, TemtseenPortal is here to support your journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a
                  href="/signup"
                  className="px-8 py-4 bg-white text-violet-600 rounded-2xl font-semibold hover:bg-violet-50 transition-all shadow-xl"
                >
                  Get Started Today
                </a>
                <a
                  href="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/20 transition-all"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}