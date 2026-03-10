"use client";

import Link from "next/link";
import { Trophy, Users, Award, Calendar, CheckCircle, Shield, Bell } from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1640356872989-e5a9cdcdd653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBjb21wZXRpdGlvbiUyMHB1cnBsZSUyMGxvZ28lMjB0cmFuc3BhcmVudHxlbnwxfHx8fDE3NzI1MDMzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="TemtseenPortal Logo" 
            className="h-32 w-32 object-contain rounded-full"
          />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t("home.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          {t("home.subtitle")}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 mb-8">
          {t("home.description")}
        </p>
        {!user && (
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t("nav.signup")}
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {t("nav.login")}
            </Link>
          </div>
        )}
        {user && (
          <Link 
            href={user.role === "organizer" ? "/organizer" : "/student"} 
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {t("nav.dashboard")}
          </Link>
        )}
      </div>

      {/* User Type Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Trophy className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("home.studentTitle")}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("home.studentDesc")}
          </p>
          {!user && (
            <Link 
              href="/signup" 
              className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t("nav.signup")}
            </Link>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Users className="size-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("home.organizerTitle")}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("home.organizerDesc")}
          </p>
          {!user && (
            <Link 
              href="/signup" 
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t("nav.signup")}
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">{t("home.features")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{t("home.feature1")}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t("home.feature1Desc")}</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Shield className="size-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{t("home.feature2")}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t("home.feature2Desc")}</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Bell className="size-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{t("home.feature3")}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t("home.feature3Desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
