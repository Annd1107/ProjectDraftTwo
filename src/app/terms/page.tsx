"use client";

import { FileText, CheckCircle, XCircle, AlertCircle, Scale, Users } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Scale className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Үйлчилгээний нөхцөл
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Үйлчилгээний нөхцөл
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Сүүлд шинэчилсэн: 2026-03-11
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            TemtseenPortal платформыг ашиглах замаар та доорх нөхцлийг хүлээн зөвшөөрч байна. Эдгээр нөхцлийг анхааралтай уншиж танилцана уу.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6 mb-12">
          {/* Section 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Users className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  1. Хэрэглэгчийн эрх, үүрэг
                </h2>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Бүртгэлд үнэн зөв мэдээлэл өгөх үүрэгтэй
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Нууц үгээ аюулгүй хадгалах, бусдад дамжуулахгүй байх
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Платформыг зөв зориулалтаар нь ашиглах
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Бусдын мэдээллийг хууль бусаар ашиглахыг хориглоно
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <FileText className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  2. Тэмцээний бүртгэл
                </h2>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <p className="text-gray-700 dark:text-gray-300">
                Тэмцээнд бүртгүүлэхдээ бүх шаардлагатай мэдээллийг үнэн зөв бөглөнө. Бүртгэлийн хураамж төлсний дараа буцаалтын нөхцөл дараах байдалтай:
              </p>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Тэмцээн эхлэхээс 7 хоногийн өмнө цуцлуулбал 80% буцаана
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  7 хоногоос дотор цуцлуулбал буцаалт үзүүлэхгүй
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Зохион байгуулагчийн буруугаас тэмцээн цуцлагдвал 100% буцаана
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Scale className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  3. Хариуцлагын хязгаарлалт
                </h2>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <p className="text-gray-700 dark:text-gray-300">
                TemtseenPortal нь зөвхөн тэмцээний бүртгэлийн платформ юм. Тэмцээний агуулга, зохион байгуулалтын талаар хариуцлага хүлээхгүй.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Техникийн шалтгаанаар үйлчилгээ түр зогсох тохиолдолд бид хариуцлага хүлээхгүй.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <XCircle className="size-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  4. Хориглох зүйлс
                </h2>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <div className="flex items-start gap-3">
                <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Системд халдах, доголдуулах оролдлого
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Бусдын бүртгэлийг хууль бусаар ашиглах
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Хуурамч мэдээлэл, баримт оруулах
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  Платформыг зүй бус арга замаар ашиглах
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="size-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  5. Нөхцөл өөрчлөлт
                </h2>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              <p className="text-gray-700 dark:text-gray-300">
                Бид үйлчилгээний нөхцлийг цаг үетэй нийцүүлэн өөрчлөх эрхтэй. Томоохон өөрчлөлтийн талаар хэрэглэгчдэд урьдчилан мэдэгдэнэ.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Өөрчлөлт хийгдсэний дараа платформыг үргэлжлүүлэн ашиглах нь шинэ нөхцлийг хүлээн зөвшөөрч байгаа гэсэн үг.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Асуулт байна уу?</h2>
          <p className="text-purple-100 mb-6">
            Үйлчилгээний нөхцлийн талаар асуулт байвал бидэнтэй холбогдоно уу
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
