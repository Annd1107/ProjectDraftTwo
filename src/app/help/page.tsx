"use client";

import { Book, Video, FileText, MessageCircle, Search, HelpCircle, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HelpCenter() {
  const categories = [
    {
      icon: Book,
      title: "Эхлэн суралцах",
      description: "Шинэ хэрэглэгчдэд зориулсан заавар",
      color: "purple",
      articles: 12,
      link: "/help/getting-started"
    },
    {
      icon: FileText,
      title: "Тэмцээний заавар",
      description: "Тэмцээнд бүртгүүлэх, оролцох заавар",
      color: "blue",
      articles: 8,
      link: "/help/tournaments"
    },
    {
      icon: MessageCircle,
      title: "Төлбөрийн заавар",
      description: "Төлбөр төлөх, буцаалт авах талаар",
      color: "green",
      articles: 6,
      link: "/help/payments"
    },
    {
      icon: Video,
      title: "Видео хичээлүүд",
      description: "Видеогоор үзүүлэх заавар",
      color: "red",
      articles: 15,
      link: "/help/videos"
    }
  ];

  const popularArticles = [
    "Хэрхэн бүртгүүлэх вэ?",
    "Тэмцээнд хэрхэн оролцох вэ?",
    "Төлбөр төлөх арга замууд",
    "Бэлтгэл материал хэрхэн татах вэ?",
    "Профайлаа хэрхэн засварлах вэ?",
    "Төлбөр буцаалт авах"
  ];

  const guides = [
    {
      title: "Сурагчдад зориулсан заавар",
      description: "Бүрэн гарын авлага PDF",
      size: "2.5 MB",
      icon: Download
    },
    {
      title: "Зохион байгуулагчдад зориулсан заавар",
      description: "Тэмцээн зохион байгуулах заавар",
      size: "3.1 MB",
      icon: Download
    },
    {
      title: "Техникийн дэмжлэгийн заавар",
      description: "Түгээмэл асуудлыг шийдэх арга",
      size: "1.8 MB",
      icon: Download
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <HelpCircle className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Тусламж төв
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Бид танд туслахад бэлэн байна
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Хэрэгтэй мэдээлэл, заавраа олоорой
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-6" />
              <input
                type="text"
                placeholder="Заавар, мэдээлэл хайх..."
                className="w-full pl-14 pr-4 py-5 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ангилал</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`size-7 text-${category.color}-600 dark:text-${category.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {category.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    {category.articles} нийтлэл
                  </span>
                  <ExternalLink className="size-4 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Түгээмэл үзсэн</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href="#"
                className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {article}
                    </span>
                  </div>
                  <ExternalLink className="size-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Downloadable Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Татаж авах материалууд</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {guide.size}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {guide.description}
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium">
                  <Download className="size-4" />
                  Татаж авах
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Хариулт олдсонгүй юу?</h2>
          <p className="text-purple-100 mb-8 text-lg">
            Манай дэмжлэгийн баг танд туслахад бэлэн байна
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-semibold"
            >
              <MessageCircle className="size-5" />
              Холбоо барих
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-xl hover:bg-white/10 transition-all font-semibold"
            >
              <HelpCircle className="size-5" />
              FAQ үзэх
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
