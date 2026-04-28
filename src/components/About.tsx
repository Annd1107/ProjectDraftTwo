import { useLanguage } from "../lib/language-context";
import { Mail, Phone, Users, Trophy, Target, BookOpen, Award } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/f903ce71512caff8e98ba718ecc02ebdf4aae725.png";

const mathImg = "https://images.unsplash.com/photo-1648801098849-565ca6939c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMG9seW1waWFkJTIwY29tcGV0aXRpb24lMjBzdHVkZW50c3xlbnwxfHx8fDE3NzUwNTIzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-purple-600 to-fuchsia-600 overflow-hidden">
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("about.title")}
            </h1>
            
            <p className="text-xl lg:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed">
              {t("about.description")}
            </p>
          </motion.div>
        </div>
      </section>


      <section className="py-24 px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t("about.mission")}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {t("about.missionDesc")}
              </p>

              <div className="space-y-4">
                {[
                  t("about.value1"),
                  t("about.value2"),
                  t("about.value3"),
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 p-2 bg-purple-600 rounded-lg">
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
                {t("about.coreValues")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("about.coreValuesDesc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: t("about.excellence"),
                desc: t("about.excellenceDesc"),
                color: "purple-600"
              },
              {
                icon: Users,
                title: t("about.community"),
                desc: t("about.communityDesc"),
                color: "purple-600"
              },
              {
                icon: BookOpen,
                title: t("about.innovation"),
                desc: t("about.innovationDesc"),
                color: "purple-600"
              },
              {
                icon: Award,
                title: t("about.achievement"),
                desc: t("about.achievementDesc"),
                color: "purple-600"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
              >
                <div className={`inline-flex p-4 bg-${value.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
    </div>
  );
}
