"use client";

import Link from "next/link";
import { Trophy, Users, Award, Calendar, CheckCircle, Shield, Bell, Sparkles, TrendingUp, FileText, Star, ArrowRight, BarChart3, BookOpen, Target, Zap, MessageCircle } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { ImageWithFallback } from "../src/app/components/figma/ImageWithFallback";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Батмөнх Ганбат",
      school: "21-р сургууль",
      image: "https://images.unsplash.com/photo-1695554110372-fd7bc19ebcdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY29tcGV0aXRpb24lMjBNb25nb2xpYXxlbnwxfHx8fDE3NzMyMDA4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "TemtseenPortal-ын ачаар математикийн олимпиадад оролцож, алтан медаль хүртлээ. Платформ маш хялбар, хэрэглэхэд ээлтэй!"
    },
    {
      name: "Сарнай Дорж",
      school: "Хөгжлийн сургууль",
      image: "https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBsZWFybmluZ3xlbnwxfHx8fDE3NzMxNDAzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Тэмцээн зохион байгуулах, оролцогчдыг удирдах нь маш энгийн болсон. Гайхалтай систем!"
    },
    {
      name: "Эрдэнэ Баяр",
      school: "42-р сургууль",
      image: "https://images.unsplash.com/photo-1728023881214-1d71a7a30a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb24lMjBzdHVkZW50c3xlbnwxfHx8fDE3NzMyMDA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Бүх тэмцээнийг нэг дороос хараад, бэлтгэл материал татаж авч суралцдаг. Гайхалтай!"
    }
  ];

  const stats = [
    { label: "Нийт Тэмцээн", value: "50+", icon: Trophy, color: "purple" },
    { label: "Сурагчид", value: "5,000+", icon: Users, color: "blue" },
    { label: "Зохион Байгуулагч", value: "100+", icon: Award, color: "green" },
    { label: "Амжилт", value: "10,000+", icon: Star, color: "yellow" }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "Хялбар бүртгэл",
      description: "Хурдан бөгөөд найдвартай бүртгэлийн систем. 2 минутанд бүртгүүл.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Аюулгүй найдвартай",
      description: "Таны мэдээлэл 100% хамгаалагдсан, олон улсын стандартад нийцсэн.",
      color: "blue"
    },
    {
      icon: Bell,
      title: "Мэдэгдэл систем",
      description: "Шинэ тэмцээн, үр дүнгийн талаар шууд мэдэгдэл авах боломжтой.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Бэлтгэл материал",
      description: "Тэмцээний бэлтгэл, сорил, даалгаврыг үнэгүй татаж авах.",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Статистик",
      description: "Өөрийн амжилт, гүйцэтгэлийг дэлгэрэнгүй харах боломжтой.",
      color: "pink"
    },
    {
      icon: Target,
      title: "Зорилго тавих",
      description: "Өөрийн зорилго тавиад, түүнийг биелүүлэхэд хялбар.",
      color: "indigo"
    }
  ];

  const upcomingEvents = [
    {
      title: "Математикийн Олимпиад 2026",
      date: "2026-03-15",
      participants: 145,
      category: "Математик"
    },
    {
      title: "Физикийн Уламжлалт Тэмцээн",
      date: "2026-04-20",
      participants: 98,
      category: "Физик"
    },
    {
      title: "Хими Олон Улсын Тэмцээн",
      date: "2026-05-10",
      participants: 67,
      category: "Хими"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Sparkles className="size-4" />
                <span className="text-sm font-medium">
                  Монгол Улсын #1 Олимпиад Платформ
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Амжилтад<br />
                <span className="text-purple-200">Хүрэх Замд</span>
              </h1>
              
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Монгол улсын хамгийн том олимпиад, тэмцээний платформд нэгдэж, мэргэжлээ дээшлүүл.
              </p>
              
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/signup" 
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl font-semibold text-lg"
                  >
                    <span>Эхлэх</span>
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all font-semibold text-lg backdrop-blur-sm"
                  >
                    Дэлгэрэнгүй
                  </Link>
                </div>
              ) : (
                <Link 
                  href={user.role === "organizer" ? "/organizer" : "/student"} 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl font-semibold text-lg"
                >
                  <LayoutDashboard className="size-5" />
                  Хянах самбар руу
                </Link>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1770482228588-270b08d2d376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBhY2hpZXZlbWVudCUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzczMTU2MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Achievement"
                  className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 sm:h-24 fill-white dark:fill-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl mb-4`}>
                <stat.icon className={`size-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Zap className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Онцлог шинж чанарууд
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Яагаад биднийг сонгох вэ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Таны амжилтад хүрэх замд шаардлагатай бүх зүйл
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`size-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-gray-50 to-purple-50/50 dark:from-gray-800 dark:to-purple-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Удахгүй болох тэмцээнүүд
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Өнөөдөр бүртгүүлээд амжилтад хүрээрэй
              </p>
            </div>
            <Link 
              href="/tournaments" 
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium"
            >
              Бүгдийг харах
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                  {event.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Calendar className="size-4" />
                    <span>{new Date(event.date).toLocaleDateString('mn-MN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Users className="size-4" />
                    <span>{event.participants} оролцогч</span>
                  </div>
                </div>
                <Link 
                  href="/tournaments" 
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all font-medium"
                >
                  Дэлгэрэнгүй
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>

          <Link 
            href="/tournaments" 
            className="sm:hidden flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium mt-8 w-full"
          >
            Бүгдийг харах
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <MessageCircle className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Хэрэглэгчдийн сэтгэгдэл
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Тэд юу хэлж байна
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Манай платформыг хэрэглэгчид хэрхэн үнэлдэг вэ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-12 sm:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Амжилтаа эхлүүлэхэд бэлэн үү?
              </h2>
              <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                5,000+ сурагч аль хэдийн ашиглаж байгаа платформд өнөөдөр нэгдээрэй
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl font-semibold text-lg"
                >
                  Үнэгүй бүртгүүлэх
                  <ArrowRight className="size-5" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all font-semibold text-lg backdrop-blur-sm"
                >
                  Холбоо барих
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
