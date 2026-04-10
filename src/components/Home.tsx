import { Link } from "react-router";
import { Trophy, Users, Award, Zap, Shield, Bell, ArrowRight, Star, CheckCircle2, Sparkles, GraduationCap, Target } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import logo from "figma:asset/f903ce71512caff8e98ba718ecc02ebdf4aae725.png";
import { motion } from "motion/react";
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/supabase'

const studentImg = "https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBjb21wZXRpdGlvbiUyMGZvY3VzZWR8ZW58MXx8fHwxNzczMjA0ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const trophyImg = "https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBhd2FyZCUyMGNlcmVtb255JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczMjA0ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";




export function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [todos, setTodos] = useState([])

    useEffect(() => {
      async function getTodos() {
        const { data, error } = await supabase.from('student').select()

        if (error) {
          console.error(error)
          
        } else {
          setTodos(data)
          console.log(data)
        }
      }

      getTodos()
    }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-screen grid lg:grid-cols-2 gap-0 overflow-hidden">
        {/* Left Side - Content */}
        <div className="relative flex items-center p-8 lg:p-16 bg-gradient-to-br from-white via-violet-50/30 to-purple-50/50 dark:from-gray-900 dark:via-purple-950/30 dark:to-violet-950/50">
          <div className="max-w-2xl mx-auto lg:mx-0 space-y-8 relative z-10">
              
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg shadow-violet-500/20 border border-violet-200/50 dark:border-violet-800/50"
            >
              <Sparkles className="size-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Mongolia's Premier Olympiad Platform
              </span>
                            <div>
      {todos.map((todo) => (
        <div>
        <p key={todo.id}>{todo.username}</p>
        <button onClick={() => {
          supabase.from('student').insert([{ username: 'Lalar', email: 'lalar@example.com' , password : 'password123' , class: '10A' , School: 'Lalar High School' , birthdate: '2005-05-15', phone: '12346930' }])
          .then(({ data, error }) => {
            if (error) {
              console.error(error)
            } else {
              console.log(data)
            }
          })
        }}>Add</button>
        </div>
      ))}
    </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
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

            {/* CTA Buttons */}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  to="/login"
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-violet-200/50 dark:border-violet-800/50"
            >
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  1,200+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  45+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tournaments</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organizers</div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-fuchsia-400 to-purple-600 rounded-full blur-3xl opacity-10"></div>
        </div>

        {/* Right Side - Image with Floating Cards */}
        <div className="relative hidden lg:flex items-center justify-center p-16 bg-gradient-to-bl from-violet-100 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:via-violet-950 dark:to-fuchsia-950">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-96 h-96 rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/30 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
            >
              <GraduationCap className="size-48 text-white opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-600/80 to-transparent"></div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 -left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-violet-500/20 border border-violet-200/50 dark:border-violet-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                  <Trophy className="size-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">45+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Active Events</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-violet-500/20 border border-violet-200/50 dark:border-violet-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl">
                  <Award className="size-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">₮10K</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Registration Fee</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white dark:bg-gray-900 transform -skew-y-2 origin-top-left"></div>
      </section>

      {/* User Type Cards - Asymmetric Layout */}
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
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Path
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join as a student or create events as an organizer
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-violet-500 to-purple-600 p-[2px] rounded-3xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg shadow-violet-500/30 mb-6">
                      <Users className="size-10 text-white" />
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {t("home.studentTitle")}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {t("home.studentDesc")}
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                        <span>Browse 45+ tournaments</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                        <span>Easy registration process</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                        <span>Track your achievements</span>
                      </li>
                    </ul>

                    {!user && (
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all group"
                      >
                        Get Started
                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Organizer Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative lg:mt-12"
            >
              <div className="relative bg-gradient-to-br from-fuchsia-500 to-purple-600 p-[2px] rounded-3xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-full blur-3xl opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-4 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl shadow-lg shadow-fuchsia-500/30 mb-6">
                      <Trophy className="size-10 text-white" />
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {t("home.organizerTitle")}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {t("home.organizerDesc")}
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0" />
                        <span>Create unlimited events</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0" />
                        <span>Manage registrations</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="size-5 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0" />
                        <span>Analytics dashboard</span>
                      </li>
                    </ul>

                    {!user && (
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/40 transition-all group"
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

      {/* Features Section - Bento Grid */}
      <section className="relative py-24 px-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/30">
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
              { icon: Zap, title: t("home.feature1"), desc: t("home.feature1Desc"), color: "from-violet-500 to-purple-600" },
              { icon: Shield, title: t("home.feature2"), desc: t("home.feature2Desc"), color: "from-fuchsia-500 to-purple-600" },
              { icon: Bell, title: t("home.feature3"), desc: t("home.feature3Desc"), color: "from-violet-500 to-fuchsia-600" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl border border-violet-200/50 dark:border-violet-800/50 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300"
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="size-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-12 lg:p-16 rounded-[3rem] overflow-hidden shadow-2xl shadow-violet-500/30"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-violet-100 mb-8">
                Join thousands of students and organizers on Mongolia's premier olympiad platform
              </p>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-white text-violet-600 rounded-2xl font-semibold hover:bg-violet-50 transition-all shadow-xl"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/20 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}