import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowLeft, RotateCcw, Briefcase, Home, User, Users, Package, Train, Wifi, Landmark, CreditCard, Coffee, FileText } from "lucide-react";
import { PolarBearMessage } from "../components/PolarBearMessage";

type NodeId = 'start' | 'q1' | 'q2' | 'q_thing' | 'q_service' | 'private' | 'entertainment' | 'consumables' | 'fixed_assets' | 'travel' | 'communication';

type QuestionNode = {
  type: 'question';
  text: string;
  options: {
    id: string;
    label: string;
    subLabel?: string;
    icon: React.ReactNode;
    next: NodeId;
  }[];
};

type ResultNode = {
  type: 'result';
  title: string;
  categoryTheme: "blue" | "yellow" | "green" | "stone";
  icon: React.ReactNode;
  badges: string[];
  explanation: string;
  examples: string[];
  tips: string;
};

type FlowData = Record<NodeId, QuestionNode | ResultNode>;

const flowData: FlowData = {
  start: {
    type: 'question',
    text: "その支払いは、仕事に関係ありますか？",
    options: [
      { id: 'start_yes', label: "はい", subLabel: "経費になるかも", icon: <Briefcase className="w-8 h-8" />, next: "q1" },
      { id: 'start_no', label: "いいえ", subLabel: "家計の支出です", icon: <Home className="w-8 h-8" />, next: "private" }
    ]
  },
  q1: {
    type: 'question',
    text: "1人でしたか？ 誰かと一緒でしたか？",
    options: [
      { id: 'q1_alone', label: "1人で", icon: <User className="w-8 h-8" />, next: "q2" },
      { id: 'q1_together', label: "誰かと一緒", icon: <Users className="w-8 h-8" />, next: "entertainment" }
    ]
  },
  q2: {
    type: 'question',
    text: "モノを買いましたか？\nサービスを受けましたか？",
    options: [
      { id: 'q2_thing', label: "モノ", subLabel: "備品や消耗品など", icon: <Package className="w-8 h-8" />, next: "q_thing" },
      { id: 'q2_service', label: "サービス", subLabel: "移動や通信など", icon: <Train className="w-8 h-8" />, next: "q_service" }
    ]
  },
  q_thing: {
    type: 'question',
    text: "金額は10万円未満ですか？",
    options: [
      { id: 'qt_under', label: "はい", subLabel: "10万円未満", icon: <CreditCard className="w-8 h-8" />, next: "consumables" },
      { id: 'qt_over', label: "いいえ", subLabel: "10万円以上", icon: <Landmark className="w-8 h-8" />, next: "fixed_assets" }
    ]
  },
  q_service: {
    type: 'question',
    text: "電車やバスですか？\nそれとも切手やネット代ですか？",
    options: [
      { id: 'qs_travel', label: "電車・バス", icon: <Train className="w-8 h-8" />, next: "travel" },
      { id: 'qs_comm', label: "切手・ネット", icon: <Wifi className="w-8 h-8" />, next: "communication" }
    ]
  },
  private: {
    type: 'result',
    title: "プライベート（家計）",
    categoryTheme: "stone",
    icon: <Home className="w-10 h-10" />,
    badges: ["経費になりません"],
    explanation: "仕事に直接関係ない支出は、個人のお金（家計）から出たものとして扱います。",
    examples: ["毎日の自分用のランチ代", "プライベートな旅行の交通費", "個人的な趣味の買い物"],
    tips: "プライベートな支出を事業用の口座から支払った場合は「事業主貸」として処理します！",
  },
  entertainment: {
    type: 'result',
    title: "接待交際費",
    categoryTheme: "yellow",
    icon: <Coffee className="w-10 h-10" />,
    badges: ["よく使う！", "領収書必須"],
    explanation: "誰かとの飲食や贈答品など。取引先だけでなく、情報交換のための同業者との飲み会も経費になります！",
    examples: ["カフェでの打ち合わせ代", "取引先とのお中元・お歳暮", "情報交換のための会食費"],
    tips: "領収書の裏や備考欄に「〇〇様と打ち合わせ」など、誰と何のために使ったかメモしておくと安心です！",
  },
  consumables: {
    type: 'result',
    title: "消耗品費",
    categoryTheme: "green",
    icon: <Package className="w-10 h-10" />,
    badges: ["よく使う！", "10万円未満"],
    explanation: "10万円未満の事務用品や備品はこれ。または、使うとすぐ無くなるもの。迷ったらとりあえずここ！",
    examples: ["コピー用紙やボールペン", "10万円未満のパソコンやスマホ", "名刺の印刷代", "ガソリン代"],
    tips: "「事務用品費」など細かく分けることもできますが、「消耗品費」にまとめてしまってもOKです。",
  },
  fixed_assets: {
    type: 'result',
    title: "固定資産（減価償却費）",
    categoryTheme: "green",
    icon: <Landmark className="w-10 h-10" />,
    badges: ["要注意！", "10万円以上"],
    explanation: "10万円以上のパソコンや車など。一度に経費にせず、決められた年数（耐用年数）に分けて少しずつ経費にします。",
    examples: ["15万円のMacBook", "事業用の自動車", "高額な応接セット"],
    tips: "青色申告の場合は「30万円未満なら一括で経費にできる特例」もあります。高い買い物をした時は要チェック！",
  },
  travel: {
    type: 'result',
    title: "旅費交通費",
    categoryTheme: "blue",
    icon: <Train className="w-10 h-10" />,
    badges: ["よく使う！", "出金伝票を活用"],
    explanation: "仕事のための移動にかかった費用です。出張時の宿泊費もここに入ります。",
    examples: ["電車代やバス代", "タクシー代", "出張先のホテル代", "コインパーキング代"],
    tips: "領収書が出ない電車代などは、日付・区間・金額をエクセル等にメモしておけば経費にできます！",
  },
  communication: {
    type: 'result',
    title: "通信費",
    categoryTheme: "blue",
    icon: <Wifi className="w-10 h-10" />,
    badges: ["家事按分に注意"],
    explanation: "仕事で使う電話代やインターネット代、郵便物の切手代などです。",
    examples: ["切手やレターパック代", "スマホ代", "プロバイダ・サーバー代", "自宅のネット回線代"],
    tips: "プライベート兼用のスマホ代やネット代は、仕事で使う割合（例：50%）だけを経費にする「家事按分」が必要です！",
  },
};

export function ExpenseDictionaryPage() {
  const [history, setHistory] = useState<NodeId[]>(['start']);
  const [searchQuery, setSearchQuery] = useState("");

  const currentNodeId = history[history.length - 1];
  const currentNode = flowData[currentNodeId];

  const handleNext = (nextId: NodeId) => setHistory((prev) => [...prev, nextId]);
  const handleBack = () => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const handleReset = () => setHistory(['start']);

  // Simple direct search fallback
  const allResults = Object.entries(flowData).filter(([_, node]) => node.type === 'result') as [NodeId, ResultNode][];
  const searchResults = allResults.filter(([_, node]) => 
    node.title.includes(searchQuery) || 
    node.explanation.includes(searchQuery) || 
    node.examples.some(ex => ex.includes(searchQuery))
  );

  const themeColors = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    yellow: "bg-amber-50 border-amber-200 text-amber-900",
    green: "bg-emerald-50 border-emerald-200 text-emerald-900",
    stone: "bg-stone-100 border-stone-200 text-stone-700"
  };

  const themeIconColors = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-amber-100 text-amber-600",
    green: "bg-emerald-100 text-emerald-600",
    stone: "bg-stone-200 text-stone-500"
  };

  const renderResultCard = (node: ResultNode) => (
    <div className={`p-6 md:p-10 rounded-[2.5rem] border-2 shadow-sm ${themeColors[node.categoryTheme]}`}>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Left Side: Icon & Title */}
        <div className="flex-1">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${themeIconColors[node.categoryTheme]}`}>
            {node.icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{node.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {node.badges.map(badge => (
              <span key={badge} className="px-3 py-1 bg-white/60 font-bold text-sm rounded-full border border-white">
                {badge}
              </span>
            ))}
          </div>

          <p className="text-lg leading-relaxed font-medium mb-6 opacity-90">
            {node.explanation}
          </p>
        </div>

        {/* Right Side: Examples & Tips */}
        <div className="flex-1 w-full bg-white/60 rounded-[2rem] p-6 border border-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 opacity-70" />
            具体例
          </h3>
          <ul className="space-y-3 mb-8">
            {node.examples.map((ex, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <div className={`w-2 h-2 rounded-full ${themeIconColors[node.categoryTheme].split(' ')[0]}`} />
                {ex}
              </li>
            ))}
          </ul>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5">
            <h4 className="font-bold text-sm mb-2 opacity-70">💡 入力のコツ</h4>
            <p className="text-sm font-medium leading-relaxed">{node.tips}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Area */}
      <div className="text-center mb-12 relative">
        <h1 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">
          これって経費？<span className="text-teal-600">仕分けチャート</span>
        </h1>
        <p className="text-stone-500 font-medium">
          質問に答えるだけで、正しい経費の科目がわかります！
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mt-8 relative z-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="「切手」「ランチ」「Amazon」などで直接検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-stone-200 bg-white text-stone-800 font-medium focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 shadow-sm transition-all text-base"
          />
        </div>
      </div>

      {searchQuery ? (
        /* Search Results View */
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-stone-600 mb-6 flex items-center gap-2">
            <Search className="w-5 h-5" /> 検索結果: {searchResults.length}件
          </h2>
          {searchResults.length > 0 ? (
            searchResults.map(([id, node]) => (
              <div key={id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderResultCard(node)}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-stone-100 border-dashed">
              <PolarBearMessage 
                message="うーん、見つからないみたいですね...&#10;違う言葉で検索するか、チャートを使ってみてください！" 
                variant="alert"
                className="justify-center"
              />
            </div>
          )}
        </div>
      ) : (
        /* Flowchart View */
        <div className="relative">
          {/* Control Bar (Back/Reset) */}
          <div className="flex justify-between items-center mb-6 min-h-[40px]">
            {history.length > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 font-bold px-4 py-2 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> 1つ戻る
              </button>
            ) : <div />}
            
            {history.length > 1 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-stone-400 hover:text-teal-600 font-bold px-4 py-2 rounded-xl hover:bg-teal-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" /> 最初から
              </button>
            )}
          </div>

          {/* Main Flow Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentNode.type === 'question' ? (
                <motion.div
                  key={currentNodeId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border-2 border-stone-100 relative overflow-hidden"
                >
                  {/* Decorative Progress Path in background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:16px_16px] opacity-30 -rotate-12 rounded-bl-full" />
                  
                  <div className="text-center mb-10 relative z-10">
                    <PolarBearMessage 
                      message={currentNode.text} 
                      className="justify-center mx-auto text-lg md:text-xl font-bold shadow-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10 max-w-2xl mx-auto">
                    {currentNode.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleNext(option.next)}
                        className="group w-full aspect-[4/3] md:aspect-square bg-[#FAFAFA] hover:bg-teal-50 rounded-3xl border-2 border-stone-200 hover:border-teal-400 flex flex-col items-center justify-center p-6 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-stone-400 group-hover:text-teal-500 group-hover:scale-110 transition-all duration-300 shadow-sm border border-stone-100 mb-4">
                          {option.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-stone-700 group-hover:text-teal-700 mb-2">
                          {option.label}
                        </h3>
                        {option.subLabel && (
                          <p className="text-sm font-bold text-stone-400 group-hover:text-teal-600/70">
                            {option.subLabel}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentNodeId}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                >
                  {renderResultCard(currentNode as ResultNode)}
                  
                  <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 delay-300 duration-500">
                    <PolarBearMessage 
                      message="わかりましたか？他にも気になる支出があれば、&#10;最初からやり直してみてくださいね！" 
                      variant="success"
                      className="justify-center"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
