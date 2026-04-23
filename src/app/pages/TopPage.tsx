import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Receipt, HelpCircle, Wallet } from "lucide-react";

export function TopPage() {
  const quickLinks = [
    {
      title: "まずは何を準備すればいい？",
      description: "専用口座とカードから始めよう",
      icon: <Wallet className="text-teal-500 w-8 h-8 mb-4" />,
      to: "/steps",
      delay: 0.1,
    },
    {
      title: "これって経費になる？",
      description: "よくある支出のOK/NGを判定",
      icon: <HelpCircle className="text-emerald-500 w-8 h-8 mb-4" />,
      to: "/dictionary",
      delay: 0.2,
    },
    {
      title: "領収書が溜まっちゃった！",
      description: "入力作業をラクにするコツ",
      icon: <Receipt className="text-stone-500 w-8 h-8 mb-4" />,
      to: "/steps",
      delay: 0.3,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 mb-24">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold tracking-wide border border-teal-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            経理は難しくない🐻‍❄️
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.3] text-stone-800 tracking-tight">
            毎月30分、<br />
            <span className="relative inline-block z-10">
              自分とビジネスを整える
              <span className="absolute bottom-1 left-0 w-full h-4 bg-teal-200/60 -z-10 rounded-sm transform -rotate-1"></span>
            </span><br />
            時間に。
          </h1>

          <p className="text-lg text-stone-500 leading-relaxed max-w-md">
            期限ギリギリで焦らないために、まずは月1回、コーヒーを飲みながら数字をチェックする習慣をつけましょう！
          </p>

          <div className="pt-4">
            <Link
              to="/steps"
              className="group inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
            >
              さっそくStep 1から始める
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full max-w-md md:max-w-none relative"
        >
          <div className="absolute inset-0 bg-teal-200/50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
          <div className="absolute inset-0 bg-stone-200/40 rounded-[3rem] transform -rotate-2 scale-105 -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1631805365519-8e7aa25625a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzc2MjQ4NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="カフェでリラックスしながら作業"
            className="rounded-[3rem] w-full object-cover aspect-[4/3] md:aspect-square shadow-xl border-4 border-white object-center"
          />
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-stone-800">
            今の悩みに合わせて選んでください
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: link.delay }}
            >
              <Link
                to={link.to}
                className="block h-full p-8 bg-white rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-md hover:border-teal-200 transition-all group active:scale-95"
              >
                {link.icon}
                <h3 className="text-xl font-bold text-stone-700 mb-3 group-hover:text-teal-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-stone-500 mb-6">
                  {link.description}
                </p>
                <div className="inline-flex items-center text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg">
                  詳しく見る
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
