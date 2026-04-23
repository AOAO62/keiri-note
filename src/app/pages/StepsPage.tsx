import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Wallet, Receipt, Filter, PenLine, Eye } from "lucide-react";
import { PolarBearMessage } from "../components/PolarBearMessage";

type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
  image: string;
  checklist: string[];
  tips: { title?: string; text: string; side?: "left" | "right" };
};

const stepsData: Step[] = [
  {
    id: 1,
    title: "準備する",
    icon: <Wallet size={24} />,
    image: "https://images.unsplash.com/photo-1677170044875-48954b4e15ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBub3RlYm9vayUyMGRlc2t8ZW58MXx8fHwxNzc2MjQ3NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    checklist: [
      "事業用の銀行口座を1つ決める（プライベートと分ける）",
      "クレジットカードを1枚決める",
    ],
    tips: {
      title: "初心者さんの注意点！",
      text: "口座とカードを分けるだけで、\n毎月の作業がグッと楽になりますよ！",
      side: "right",
    },
  },
  {
    id: 2,
    title: "集める",
    icon: <Receipt size={24} />,
    image: "https://images.unsplash.com/photo-1594404430367-9858af713541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNlaXB0JTIwY2FmZXxlbnwxfHx8fDE3NzYyNDc1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    checklist: [
      "財布の中のレシートを事業用とプライベートに分ける",
      "事業用のレシートを月ごとの封筒やファイルに入れる",
      "ネット通販の領収書をダウンロードする",
    ],
    tips: {
      title: "ここがポイント！",
      text: "レシートは綺麗に貼らなくても大丈夫。\n月ごとにまとめておくだけでOKです！",
      side: "left",
    },
  },
  {
    id: 3,
    title: "分ける",
    icon: <Filter size={24} />,
    image: "https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxjdWxhdG9yJTIwbm90ZWJvb2t8ZW58MXx8fHwxNzc2MjQ3NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    checklist: [
      "経費になるもの・ならないものをチェックする",
      "「何代」なのか（交通費、会議費など）を大まかに分類する",
    ],
    tips: {
      title: "迷ったら？",
      text: "「これって経費？」と迷ったら、\nQ&Aページで検索してみましょう！",
      side: "right",
    },
  },
  {
    id: 4,
    title: "入力する",
    icon: <PenLine size={24} />,
    image: "https://images.unsplash.com/photo-1761083042210-bb334df182e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBvZmZpY2UlMjBwbGFudHxlbnwxfHx8fDE3NzYyNDg1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    checklist: [
      "会計ソフトやスプレッドシートを開く",
      "売上（入金）を入力する",
      "経費（レシート・カード明細）を入力する",
    ],
    tips: {
      title: "一気に入力！",
      text: "毎日やらなくて大丈夫！\n月1回、コーヒーを片手に一気にやっちゃいましょう。",
      side: "left",
    },
  },
  {
    id: 5,
    title: "確認する",
    icon: <Eye size={24} />,
    image: "https://images.unsplash.com/photo-1631805365519-8e7aa25625a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzc2MjQ4NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    checklist: [
      "通帳の残高と帳簿の残高が合っているか確認する",
      "今月の「売上」と「経費」のバランスを見る",
      "レシートを保管ボックスへしまう",
    ],
    tips: {
      title: "お疲れ様でした！",
      text: "数字のズレがなければ今月は完了！\n自分にご褒美をあげましょう🍰",
      side: "right",
    },
  },
];

export function StepsPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (stepId: number, itemIdx: number) => {
    const key = `${stepId}-${itemIdx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1つのStepがすべてチェックされたか判定
  const isStepComplete = (stepId: number) => {
    const step = stepsData.find((s) => s.id === stepId);
    if (!step) return false;
    return step.checklist.every((_, idx) => checkedItems[`${stepId}-${idx}`]);
  };

  return (
    <div className="pb-24">
      {/* Progress Bar (Sticky) */}
      <div className="sticky top-16 z-40 bg-[#F7FAF8]/95 backdrop-blur-md py-4 border-b border-teal-100/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center relative">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 rounded-full z-0 border border-stone-300 border-dashed" />
            {/* Active Line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 rounded-full z-0 transition-all duration-500 ease-out"
              style={{ width: `${((activeStep - 1) / (stepsData.length - 1)) * 100}%` }}
            />

            {stepsData.map((step) => {
              const isPast = step.id < activeStep;
              const isActive = step.id === activeStep;
              const isComplete = isStepComplete(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative z-10 flex flex-col items-center gap-2 group outline-none focus-visible:ring-2 ring-teal-400 rounded-lg p-1 transition-transform ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors border-2 ${
                      isComplete
                        ? "bg-teal-500 text-white border-teal-500"
                        : isActive
                        ? "bg-white text-teal-600 border-teal-500"
                        : isPast
                        ? "bg-teal-50 text-teal-600 border-teal-200"
                        : "bg-white text-stone-400 border-stone-200"
                    }`}
                  >
                    {isComplete ? <Check size={20} strokeWidth={3} /> : step.id}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:block ${
                      isActive || isComplete ? "text-stone-700" : "text-stone-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">
            月イチ経理の<span className="text-teal-600">5つのStep</span>
          </h1>
          <p className="text-stone-500">
            順番に進めていけば大丈夫。今日はどこまで進めましょうか？
          </p>
        </div>

        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {stepsData.map((step, index) => {
              if (step.id !== activeStep) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-6 md:p-10"
                >
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left: Image & Title */}
                    <div className="lg:w-2/5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 font-bold mb-4">
                        Step {step.id} {step.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-stone-800 mb-6 tracking-tight">
                        {step.title}
                      </h2>
                      <div className="rounded-[2rem] overflow-hidden aspect-[4/3] shadow-md relative">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      {/* Responsive Tip - shows under image on desktop, bottom on mobile */}
                      <div className="mt-8 hidden lg:block">
                        <PolarBearMessage message={step.tips.text} bubbleSide={step.tips.side} />
                      </div>
                    </div>

                    {/* Right: Checklist */}
                    <div className="lg:w-3/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                          <Check className="text-teal-500" size={20} strokeWidth={3} /> やることリスト
                        </h3>
                        <div className="space-y-4">
                          {step.checklist.map((item, idx) => {
                            const isChecked = checkedItems[`${step.id}-${idx}`] || false;
                            return (
                              <label
                                key={idx}
                                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                                  isChecked
                                    ? "bg-teal-50/50 border-teal-200"
                                    : "bg-[#FAFAFA] border-stone-100 hover:border-teal-300 hover:bg-white shadow-sm"
                                }`}
                              >
                                <div className="pt-0.5">
                                  <div
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                                      isChecked
                                        ? "bg-teal-500 border-teal-500 text-white"
                                        : "bg-white border-stone-300 text-transparent"
                                    }`}
                                  >
                                    <Check size={16} strokeWidth={3} />
                                  </div>
                                </div>
                                <span
                                  className={`text-base font-bold leading-tight ${
                                    isChecked ? "text-stone-400 line-through decoration-stone-300" : "text-stone-700"
                                  }`}
                                >
                                  {item}
                                </span>
                                {/* Hidden Checkbox for a11y */}
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => toggleCheck(step.id, idx)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Tip */}
                      <div className="mt-8 lg:hidden">
                        <PolarBearMessage message={step.tips.text} bubbleSide={step.tips.side} />
                      </div>

                      {/* Next Step Button */}
                      <div className="mt-10 flex justify-end">
                        {step.id < stepsData.length ? (
                          <button
                            onClick={() => setActiveStep(step.id + 1)}
                            className="bg-stone-800 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-lg active:scale-95 w-full md:w-auto"
                          >
                            次のStepへ進む
                          </button>
                        ) : (
                          <div className="bg-teal-50 text-teal-800 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 w-full justify-center">
                            <span className="text-2xl">🎉</span>
                            これで準備は完璧！次は入力に挑戦しましょう
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
