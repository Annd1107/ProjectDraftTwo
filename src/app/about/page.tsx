"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Target, Users, Award, Sparkles, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "../../lib/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-gray-900 dark:via-purple-950/10 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8 transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t("profile.back")}</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-6 border border-purple-200 dark:border-purple-800">
            <Sparkles className="size-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              About Us
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Монгол улсын сурагчдын боловсрол, хөгжилд хувь нэмэр оруулж байна
          </p>
        </div>

        {/* Mission Section */}
        <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Target className="size-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">{t("about.mission")}</h2>
            </div>
            <p className="text-lg text-purple-50 leading-relaxed">
              {t("about.missionText")}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4">
              <TrendingUp className="size-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
              <Users className="size-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5,000+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Students</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/50 rounded-xl mb-4">
              <Award className="size-7 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Tournaments</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t("about.howItWorks")}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Students */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Users className="size-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("about.forStudents")}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">For Students</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("about.forStudentsText")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Registration
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Resources
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Progress Tracking
                </span>
              </div>
            </div>

            {/* For Organizers */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Award className="size-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("about.forOrganizers")}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">For Organizers</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("about.forOrganizersText")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Event Creation
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Management
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Analytics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl mb-4">
                <Shield className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Security</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Таны мэдээллийг хамгийн өндөр түвшний аюулгүй байдлаар хамгаална
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
                <Sparkles className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Хамгийн сүүлийн үеийн технологийг ашиглан үйлчилгээгээ сайжруулна
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4">
                <Users className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Сурагчдын нийгэмлэг болон хамтын ажиллагааг дэмжинэ
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t("about.contact")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("about.contactText")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                <Mail className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</div>
                <div className="font-semibold text-gray-900 dark:text-white">{t("about.email")}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                <Phone className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                <div className="font-semibold text-gray-900 dark:text-white">{t("about.phone")}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
                <MapPin className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</div>
                <div className="font-semibold text-gray-900 dark:text-white">Улаанбаатар, МУ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}