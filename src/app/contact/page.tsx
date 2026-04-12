"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Таны мессеж амжилттай илгээгдлээ! Бид удахгүй хариулах болно.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <MessageCircle className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Холбоо барих
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Бидэнтэй холбогдох
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Таны асуулт, санал хүсэлтийг сонсоход бэлэн байна
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4">
              <Phone className="size-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Утас</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Бид танд ажлын өдрүүдэд 9:00-18:00 хооронд хариулна
            </p>
            <a href="tel:+97670000000" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
              +976 7000-0000
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
              <Mail className="size-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">И-мэйл</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Бидэнд и-мэйл илгээх боломжтой
            </p>
            <a href="mailto:info@temtseen.mn" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              info@temtseen.mn
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
              <MapPin className="size-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Хаяг</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Манай оффис Улаанбаатар хотод байрладаг
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Улаанбаатар хот, Монгол Улс
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Мессеж илгээх
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Таны нэр *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  placeholder="Нэрээ оруулна уу"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  И-мэйл хаяг *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Сэдэв *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                >
                  <option value="">Сэдэв сонгоно уу</option>
                  <option value="general">Ерөнхий асуулт</option>
                  <option value="technical">Техникийн асуудал</option>
                  <option value="payment">Төлбөрийн асуудал</option>
                  <option value="tournament">Тэмцээний талаар</option>
                  <option value="feedback">Санал хүсэлт</option>
                  <option value="other">Бусад</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Мессеж *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-none"
                  placeholder="Асуулт, санал хүсэлтээ бичнэ үү..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <Send className="size-5" />
                Илгээх
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="size-8" />
                <h3 className="text-2xl font-bold">Ажлын цаг</h3>
              </div>
              <div className="space-y-3 text-purple-100">
                <div className="flex justify-between">
                  <span>Даваа - Баасан:</span>
                  <span className="font-semibold text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Бямба:</span>
                  <span className="font-semibold text-white">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Ням:</span>
                  <span className="font-semibold text-white">Амралт</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Биднийг дагаарай
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Facebook className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Facebook</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">5K дагагч</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white">
                    <Twitter className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Twitter</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2K дагагч</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <Instagram className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Instagram</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">8K дагагч</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <Youtube className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">YouTube</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">3K дагагч</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Хурдан холбоосууд
              </h3>
              <div className="space-y-3">
                <a href="/faq" className="block text-purple-600 dark:text-purple-400 hover:underline font-medium">
                  → Түгээмэл асуулт хариулт
                </a>
                <a href="/help" className="block text-purple-600 dark:text-purple-400 hover:underline font-medium">
                  → Тусламж төв
                </a>
                <a href="/guidelines" className="block text-purple-600 dark:text-purple-400 hover:underline font-medium">
                  → Хэрэглэгчийн заавар
                </a>
                <a href="/terms" className="block text-purple-600 dark:text-purple-400 hover:underline font-medium">
                  → Үйлчилгээний нөхцөл
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
