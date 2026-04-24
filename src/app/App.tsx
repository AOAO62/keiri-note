import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate } from "react-router";

// --- デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0fdfa",
  bg: "#f4f7f6",
  text: "#333",
  white: "#ffffff",
  border: "#eee",
  dark: "#333",
};

// --- データ定義 ---
const STEPS = [
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がラクになります！" },
  { id: 2, title: "整理をしよう", tasks: ["レシートを事業用と私用に分ける", "月ごとの封筒に入れる"], advice: "月ごとにまとめておくだけでOKです！" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるかチェックする", "勘定科目を大まかに分ける"], advice: "迷ったら診断機能を使ってみましょう！" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "コーヒーを片手に一気にやっちゃいましょう。" },
  { id: 5, title: "完了！", tasks: ["通帳と帳簿の残高確認", "レシートを保管箱へ"], advice: "自分にご褒美をあげましょう🍰" },
];

const MESSAGES = ["シロクマ先生は、いつでもあなたの味方です。", "経理を制する者は、ビジネスを制する！", "一歩ずつ、確実に進んでいきましょう。"];

// --- 保存機能 ---
const getSavedProgress = () => {
  try {
    const saved = localStorage.getItem("keiri_progress");
    return saved ? JSON.parse(saved) : {};
  } catch (e) { return {}; }
};

// --- スタイル ---
const cardStyle = { backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "20px" };
const buttonStyle = (bg: string) => ({ display: "block", width: "100%", padding: "16px", backgroundColor: bg, color: "white", borderRadius: "12px", textDecoration: "none", textAlign: "center" as const, fontWeight: "bold" as const, border: "none", cursor: "pointer", fontSize: "16px", marginBottom: "10px" });

// --- コンポーネント ---

const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px", color: theme.mint }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// ステップ進捗バー (image_b38a3f.png 再現)
const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 30px", position: "relative", maxWidth: "500px", margin: "0 auto" }}>
    <div style={{ position: "absolute", top: "50%", left: "40px", right: "40px", height: "2px", backgroundColor: "#eee", zIndex: 1 }}></div>
    <div style={{ position: "absolute", top: "50%", left: "40px", width: `${(currentStep - 1) * 25}%`, height: "2px", backgroundColor: theme.mint, zIndex: 1, transition: "width 0.3s" }}></div>
    {[1, 2, 3, 4, 5].map((s) => (
      <div key={s} style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: s <= currentStep ? theme.white : "#fff", border: `2px solid ${s <= currentStep ? theme.mint : "#eee"}`, z : 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: s <= currentStep ? theme.mint : "#ccc", fontWeight: "bold", position: "relative", zIndex: 2 }}>{s}</div>
    ))}
  </div>
);

// チャート診断コンポーネント (image_b389f9.png風)
const Diagnosis = () => {
  const [stage, setStage] = useState("start");

  const stages: any = {
    start: { q: "その支払いは、仕事に関係がありますか？", yes: "work", no: "not_out" },
    work: { q: "10万円以上の高価なもの（パソコン等）ですか？", yes: "asset", no: "expense" },
    not_out: { res: "残念ながら経費にはなりません...。プライベートの支出として管理しましょう。", icon: "❌" },
    asset: { res: "「固定資産」になる可能性があります。数年に分けて経費にする計算（減価償却）が必要です！", icon: "💻" },
    expense: { res: "バッチリ経費にできます！領収書を忘れずに保管して、入力を進めましょう。", icon: "✅" }
  };

  const current = stages[stage];

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "40px 20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ ...cardStyle, textAlign: "center", minHeight: "250px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {current.q ? (
            <>
              <h3 style={{ fontSize: "18px", marginBottom: "30px" }}>{current.q}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <button onClick={() => setStage(current.yes)} style={buttonStyle(theme.mint)}>はい</button>
                <button onClick={() => setStage(current.no)} style={buttonStyle("#999")}>いいえ</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>{current.icon}</div>
              <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "30px" }}>{current.res}</p>
              <button onClick={() => setStage("start")} style={buttonStyle(theme.dark)}>もう一度診断する</button>
            </>
          )}
        </div>
        <Link to="/" style={{ display: "block", textAlign: "center", color: theme.mint, textDecoration: "none" }}>トップへ戻る</Link>
      </main>
    </div>
  );
};

const TopPage = () => {
  const [progress] = useState(getSavedProgress());
  
  // ステップ完了判定の修正（タスクが全てtrueであること）
  const completedStepsCount = STEPS.filter(step => 
    step.tasks.length > 0 && step.tasks.every(t => progress[`${step.id}-${t}`] === true)
  ).length;

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "15px", border: `1px solid ${theme.mint}`, borderRadius: "15px", marginBottom: "20px", backgroundColor: "#fff" }}>
          <span style={{ fontSize: "11px", color: theme.mint, fontWeight: "bold", display: "block", marginBottom: "5px" }}>SHIROKUMA COLUMN</span>
          <strong style={{ fontSize: "14px" }}>「完璧じゃなくていい、『だいたい』で一歩前へ。」</strong>
        </div>

        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: "#666" }}>ご褒美コーヒーまで</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: theme.mint, margin: "10px 0" }}>
              あと {5 - completedStepsCount} Step
            </div>
            <div style={{ width: "100%", backgroundColor: "#eee", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${(completedStepsCount / 5) * 100}%`, backgroundColor: theme.mint, height: "100%", transition: "width 0.5s ease" }}></div>
            </div>
          </div>
        </div>

        <Link to="/diagnosis" style={buttonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
        <Link to="/step/1" style={buttonStyle(theme.dark)}>Step 1 からはじめる →</Link>
      </main>
    </div>
  );
};

const StepPage = () => {
  const { id } = useParams();
  const stepNum = parseInt(id || "1");
  const step = STEPS[stepNum - 1];
  const [progress, setProgress] = useState(getSavedProgress());

  if (!step) return <Navigate to="/" />;

  const toggleTask = (task: string) => {
    const key = `${stepNum}-${task}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem("keiri_progress", JSON.stringify(newProgress));
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }}>
      <Header />
      <ProgressBar currentStep={stepNum} />
      <main style={{ padding: "0 20px 40px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: theme.mint }}>Step {stepNum}: {step.title}</h2>
          {step.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "12px", padding: "16px", border: `1px solid ${theme.border}`, borderRadius: "15px", marginBottom: "12px", alignItems: "center", cursor: "pointer", backgroundColor: progress[`${stepNum}-${task}`] ? "#f9f9f9" : "#fff" }}>
              <input type="checkbox" checked={!!progress[`${stepNum}-${task}`]} onChange={() => toggleTask(task)} style={{ width: "20px", height: "20px", accentColor: theme.mint }} />
              <span style={{ fontSize: "14px", color: progress[`${stepNum}-${task}`] ? "#ccc" : "#333", textDecoration: progress[`${stepNum}-${task}`] ? "line-through" : "none" }}>{task}</span>
            </label>
          ))}
          
          <div style={{ display: "flex", gap: "12px", marginTop: "30px", backgroundColor: theme.lightMint, padding: "20px", borderRadius: "15px", position: "relative" }}>
             <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
             <p style={{ fontSize: "13px", margin: 0, lineHeight: "1.6", color: "#444" }}>{step.advice}</p>
          </div>
        </div>

        {stepNum < 5 ? (
          <Link to={`/step/${stepNum + 1}`} style={buttonStyle(theme.dark)}>次のStepへ進む</Link>
        ) : (
          <Link to="/" style={buttonStyle(theme.mint)}>全てのステップを完了！トップへ</Link>
        )}
        <Link to="/" style={{ display: "block", textAlign: "center", color: "#999", textDecoration: "none", fontSize: "13px", marginTop: "15px" }}>トップへ戻る</Link>
      </main>
    </div>
  );
};

// --- ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/step/:id", element: <StepPage /> },
  { path: "/diagnosis", element: <Diagnosis /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
