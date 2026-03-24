"use client";

import { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Ерөнхий",
      questions: [
        {
          question: "TemtseenPortal гэж юу вэ?",
          answer: "TemtseenPortal нь Монгол улсын ахлах ангийн сурагчдад зориулсан олимпиад, тэмцээний бүртгэлийн платформ юм. Энд та бүх төрлийн тэмцээнд хялбархан бүртгүүлж, бэлтгэл материал татаж авч, амжилтаа хянах боломжтой."
        },
        {
          question: "Хэрхэн бүртгүүлэх вэ?",
          answer: "Манай сайтын 'Бүртгүүлэх' товчийг дарж, цахим шуудангаа оруулаад, 'Сурагч' эсвэл 'Зохион байгуулагч' гэснээс өөрт тохирохыг сонгоно. Дараа нь хэдхэн минутанд бүртгэлээ гүйцэтгэнэ."
        },
        {
          question: "Бүртгэл үнэтэй юу?",
          answer: "Үгүй, бүртгэл бүрэн үнэгүй. Гэхдээ тэмцээн бүрт бүртгүүлэхдээ тухайн тэмцээний бүртгэлийн хураамжийг төлөх шаардлагатай (ихэвчлэн 10,000₮ орчим)."
        },
        {
          question: "Хэдэн тэмцээнд оролцож болох вэ?",
          answer: "Та хүссэн хэдэн тэмцээнд ч оролцож болно. Ямар ч хязгаарлалт байхгүй. Өөрийн чадвар, цаг заваа харгалзан сонголт хийнэ үү."
        }
      ]
    },
    {
      category: "Төлбөр",
      questions: [
        {
          question: "Тэмцээний хураамж хэдэн төгрөг вэ?",
          answer: "Тэмцээн бүр өөр өөр хураамжтай боловч ихэнх тохиолдолд 10,000₮ орчим байдаг. Зарим томоохон олон улсын тэмцээн илүү өндөр хураамжтай байж болно."
        },
        {
          question: "Хэрхэн төлбөр төлөх вэ?",
          answer: "Тэмцээнд бүртгүүлэх үед төлбөрийн цонх нээгдэх бөгөөд та картаар эсвэл бусад арга хэрэгслээр төлнө. Төлбөр амжилттай болсны дараа бүртгэл баталгаажна."
        },
        {
          question: "Төлбөр буцаан авч болох уу?",
          answer: "Тийм, тэмцээн эхлэхээс 7 хоногийн өмнө мэдэгдэл өгч бүртгэл цуцлуулбал төлбөрийн 80%-ийг буцаан авч болно. Тэмцээн эхэлснээс хойш буцаан олгохгүй."
        },
        {
          question: "Нэхэмжлэх авч болох уу?",
          answer: "Тийм, төлбөр төлсний дараа таны профайлын 'Төлбөрийн түүх' хэсгээс цахим нэхэмжлэхээ татаж авах боломжтой."
        }
      ]
    },
    {
      category: "Тэмцээн",
      questions: [
        {
          question: "Ямар төрлийн тэмцээнүүд байдаг вэ?",
          answer: "Математик, физик, хими, биологи, мэдээллийн технологи гэх мэт олон төрлийн тэмцээнүүд байдаг. Мөн олон улсын болон дотоодын тэмцээнүүд байна."
        },
        {
          question: "Бэлтгэл материал авах боломжтой юу?",
          answer: "Тийм, тэмцээн бүрт бэлтгэл материал, сорил, даалгаврыг үнэгүй татаж авах боломжтой. Зарим тэмцээнд видео хичээл, вебинар зэрэг нэмэлт материал ч байдаг."
        },
        {
          question: "Тэмцээний үр дүн хэзээ гарах вэ?",
          answer: "Тэмцээн болсноос хойш ихэвчлэн 1-2 долоо хоногийн дараа үр дүн гарна. Үр дүн гарсан даруй таны профайл болон мэдэгдэлд харагдана."
        },
        {
          question: "Тэмцээнээс бүртгэл хасуулж болох уу?",
          answer: "Тийм, тэмцээний дэлгэрэнгүй хуудаснаас 'Бүртгэл цуцлах' товчийг дарж цуцлах боломжтой. Гэхдээ төлбөрийн буцаалтын нөхцөлийг анхаараарай."
        }
      ]
    },
    {
      category: "Техник",
      questions: [
        {
          question: "Аппликейшн байгаа юу?",
          answer: "Одоогоор зөвхөн вэб платформ байгаа. Гэхдээ манай сайт бүх төхөөрөмж дээр маш сайн ажилладаг тул утаснаас ч гэсэн ашиглахад хялбар."
        },
        {
          question: "Нууц үгээ мартсан бол?",
          answer: "Нэвтрэх хуудаснаас 'Нууц үг сэргээх' товчийг дарж, бүртгэлтэй цахим шуудангаа оруулна. Танд сэргээх холбоосыг илгээх болно."
        },
        {
          question: "Асуудал гарвал хэнд хандах вэ?",
          answer: "Та манай дэмжлэгийн багт info@temtseen.mn хаягаар эсвэл утсаар +976 7000-0000 дугаарт холбогдож болно. Мөн сайт дээрх чат дэмжлэг ашиглаж болно."
        },
        {
          question: "Профайл мэдээллээ өөрчилж болох уу?",
          answer: "Тийм, профайл хэсэгтээ ороод нэр, сургууль, анги зэрэг мэдээллээ хүссэн үедээ өөрчилж болно."
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <HelpCircle className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Тусламж & Дэмжлэг
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Түгээмэл асуулт хариулт
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Таны асуултад бэлэн хариулт
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Асуулт хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-8 mb-16">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`size-5 text-purple-600 dark:text-purple-400 flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Хариулт олдсонгүй юу?</h2>
          <p className="text-purple-100 mb-6">
            Манай дэмжлэгийн баг танд туслахад бэлэн байна
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-semibold"
            >
              <MessageCircle className="size-5" />
              Холбоо барих
            </Link>
            <a
              href="mailto:info@temtseen.mn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white rounded-xl hover:bg-white/10 transition-all font-semibold"
            >
              <Mail className="size-5" />
              И-мэйл илгээх
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
