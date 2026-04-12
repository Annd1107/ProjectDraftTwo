"use client";

import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Мэдээлэл цуглуулах",
      content: "Бид таны нэр, и-мэйл хаяг, сургууль, анги зэрэг үндсэн мэдээллийг цуглуулна. Энэ мэдээлэл нь зөвхөн үйлчилгээ үзүүлэх зорилгоор ашиглагдах бөгөөд гуравдагч талд дамжуулахгүй."
    },
    {
      icon: Lock,
      title: "Мэдээллийн аюулгүй байдал",
      content: "Таны бүх мэдээлэл шифрлэгдсэн хэлбэрээр хадгалагдана. Бид олон улсын стандартад нийцсэн аюулгүй байдлын системийг ашигладаг."
    },
    {
      icon: Eye,
      title: "Мэдээлэл ашиглах",
      content: "Таны мэдээлэл зөвхөн тэмцээний бүртгэл, үр дүн мэдэгдэх, платформын үйлчилгээг сайжруулахад ашиглагдана. Маркетингийн зорилгоор ашиглахгүй."
    },
    {
      icon: UserCheck,
      title: "Таны эрх",
      content: "Та өөрийн мэдээллийг хэдийд ч засах, устгах эрхтэй. Мөн таны мэдээллийг хэрхэн ашиглаж байгааг мэдэх эрхтэй."
    },
    {
      icon: FileText,
      title: "Күүкиз ашиглалт",
      content: "Бид таны туршлагыг сайжруулахын тулд күүкиз ашигладаг. Та хүссэн үедээ күүкизийг идэвхгүй болгож болно."
    },
    {
      icon: Shield,
      title: "Гуравдагч талын үйлчилгээ",
      content: "Бид зарим гуравдагч талын үйлчилгээ (төлбөрийн систем гэх мэт) ашигладаг. Эдгээр үйлчилгээ нь өөрсдийн нууцлалын бодлоготой."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Shield className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Нууцлалын бодлого
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Нууцлалын бодлого
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Сүүлд шинэчилсэн: 2026-03-11
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            TemtseenPortal-д тавтай морилно уу. Бид таны хувийн мэдээллийн нууцлал, аюулгүй байдлыг эн тэргүүнд тавьдаг. Энэхүү нууцлалын бодлого нь бид таны мэдээллийг хэрхэн цуглуулж, ашиглаж, хамгаалж байгааг тайлбарласан болно.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Манай үйлчилгээг ашиглах замаар та энэхүү нууцлалын бодлоготой танилцаж, зөвшөөрч байна.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <section.icon className="size-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Асуулт байна уу?</h2>
          <p className="text-purple-100 mb-6">
            Нууцлалын бодлогын талаар асуулт байвал бидэнтэй холбогдоно уу
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-semibold"
          >
            Холбоо барих →
          </a>
        </div>
      </div>
    </div>
  );
}
