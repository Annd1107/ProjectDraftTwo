"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Target, Users, Award } from "lucide-react";
import { useLanguage } from "../../lib/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8 transition-colors"
      >
        <ArrowLeft className="size-4" />
        {t("profile.back")}
      </Link>

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("about.title")}
        </h1>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8 transition-colors">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Target className="size-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("about.mission")}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {t("about.missionText")}
        </p>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          {t("about.howItWorks")}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t("about.forStudents")}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t("about.forStudentsText")}
            </p>
          </div>

          {/* For Organizers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Award className="size-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t("about.forOrganizers")}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t("about.forOrganizersText")}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("about.contact")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t("about.contactText")}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail className="size-5 text-purple-600 dark:text-purple-400" />
            <span>{t("about.email")}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Phone className="size-5 text-purple-600 dark:text-purple-400" />
            <span>{t("about.phone")}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <MapPin className="size-5 text-purple-600 dark:text-purple-400" />
            <span>Улаанбаатар, Монгол Улс</span>
          </div>
        </div>
      </div>
    </div>
  );
}
