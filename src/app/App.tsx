import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate } from "react-router";

// --- 1. デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  white: "#ffffff",
  border: "#eee",
};

// --- 2. データ定義 ---
const STEPS = [
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がラクになります！" },
  { id: 2, title: "整理をしよう", tasks: ["レシートを分ける", "封筒やファイルに入れる"], advice: "綺麗に貼らなくてOK。月ごとにまとめるだけで十分です。" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるか確認", "大まかに分類する"], advice: "迷ったら「診断機能」を使ってみてくださいね。" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力"], advice: "月1回、コーヒーを片手に一気に入力しましょう。" },
  { id: 5, title: "完了！", tasks: ["残高の確認", "レシートの保管"], advice: "今月もお疲れ様でした！自分にご褒美を🍰" },
];

const MESSAGES = [
  "経理を制する者は、ビジネスを制する！",
  "完璧じゃなくていい、『だいたい』で一歩前へ。",
  "レシートの山は、あなたが頑張った証拠ですよ。",
  "数字は嘘をつかない。あなたの努力も裏切らない。",
  "シロクマ先生は、いつでもあなたの味方です。",
];

// --- 3. ヘルパー関数 ---
const getSavedProgress = () => {
  try {
    const saved = localStorage.getItem("keiri_progress");
    return saved ? JSON.parse(saved) : {};
  } catch (e) { return {}; }
};

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", 
  backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const, boxShadow: "0 4px 0 rgba(0,0,0,0.1)"
});

// --- 4. コンポーネント定義（ルーターより前に書くのが重要です） ---

const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// 診断ページ
const Diagnosis = () => (
  <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "30px" }}>
        <h2 style={{ color: theme.mint }}>これって経費？診断 🐻‍❄️</h2>
        <div style={{ margin: "20px 0", textAlign: "left", fontSize: "14px", lineHeight: "1.6" }}>
          <p><strong>Q. 仕事で使うカフェ代は？</strong><br/>A. 打ち合わせや仕事目的ならOK。でも「ご飯代」は難しい場合が多いです。</p>
          <hr style={{ border: "none", borderTop: `1px solid ${theme.border}`, margin: "15px 0" }} />
          <p><strong>Q. 文房具や本は？</strong><br/>A. 100%仕事で使うなら「消耗品費」や「新聞図書費」としてOKです！</p>
        </div>
        <Link to="/" style={mainButtonStyle(theme.mint)}>トップへ戻る</Link>
      </div>
    </main>
  </div>
);

// 格言詳細
const ColumnPage = () => (
  <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "30px" }}>
        <h2 style={{ color: theme.mint, textAlign: "center" }}>シロクマ格言集</h2>
        <div style={{ marginTop: "20px" }}>
          {MESSAGES.map((m, i) => (
            <div key={i} style={{ padding: "15px 0", borderBottom: `1px solid ${theme.border}`, fontSize: "14px" }}>🐻‍❄️ {m}</div>
          ))}
        </div>
        <Link to="/" style={{ ...mainButtonStyle(theme.mint), marginTop: "30px" }}>戻る</Link>
      </div>
    </main>
  </div>
);

// ステップ詳細
const StepPage = () => {
  const { id } = useParams();
  const num = parseInt(id || "1");
  const content = STEPS[num - 1];
  const [progress, setProgress] = useState(getSavedProgress());

  if (!content) return <Navigate to="/" />;

  const handleCheck = (task: string) => {
    const key = `${num}-${task}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem("keiri_progress", JSON.stringify(newProgress));
  };

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>Step {num}: {content.title}</h2>
          {content.tasks.map((t, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "10px", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={!!progress[`${num}-${t}`]} onChange={() => handleCheck(t)} style={{ width: "18px", height: "18px" }} />
              <span style={{ fontSize: "14px", textDecoration: progress[`${num}-${t}`] ? "line-through" : "none", color: progress[`${num}-${t}`] ? "#ccc" : "inherit" }}>{t}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span style={{ fontSize: "20px" }}>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0, lineHeight: "1.5" }}>{content.advice}</p>
          </div>
          <Link to="/" style={{ ...mainButtonStyle(theme.mint), marginTop: "30px" }}>トップへ戻って確認</Link>
        </div>
      </main>
    </div>
  );
};

// トップページ
const TopPage = () => {
  const [progress] = useState(getSavedProgress());
  const [luckyMsg, setLuckyMsg] = useState("");

  useEffect(() => {
    setLuckyMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  }, []);

  const totalTasks = STEPS.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasksCount = Object.values(progress).filter(val => val === true).length;
  const completedStepsCount = STEPS.filter(step => step.tasks.every(t => progress[`${step.id}-${t}`])).length;

  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        
        <Link to="/column" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ textAlign: "center", padding: "15px", border: `2px solid ${theme.lightMint}`, borderRadius: "15px", marginBottom: "20px", backgroundColor: "#fdfdfd" }}>
            <span style={{ fontSize: "11px", color: theme.mint, fontWeight: "bold", display: "block", marginBottom: "4px" }}>SHIROKUMA COLUMN</span>
            <strong style={{ fontSize: "15px" }}>「{luckyMsg}」</strong>
          </div>
        </Link>

        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <span style={{ backgroundColor: theme.mint, color: "white", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
            称号：{completedStepsCount === 5 ? "経理の達人 🏆" : completedStepsCount >= 3 ? "ひよこ 🐣" : "見習い 🐾"}
          </span>
        </div>

        <div style={{ width: "100%", height: "200px", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", backgroundColor: theme.lightMint }}>
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" alt="main" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.currentTarget.style.display="none")} />
        </div>

        <div style={{ backgroundColor: theme.lightMint, padding: "20px", borderRadius: "16px", marginBottom: "30px", textAlign: "center", border: `1px solid ${theme.mint}` }}>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>ご褒美コーヒーまで</div>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: theme.mint, margin: "5px 0" }}>あと {5 - completedStepsCount} Step</div>
          <div style={{ width: "100%", backgroundColor: "#fff", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
            <div style={{ width: `${(completedTasksCount / totalTasks) * 100}%`, backgroundColor: theme.mint, height: "100%", transition: "width 0.5s ease" }}></div>
          </div>
        </div>

        <div style={{ display: "grid", gap: "15px" }}>
          <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
          <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 からはじめる →</Link>
        </div>
      </main>
    </div>
  );
};

// --- 5. ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/column", element: <ColumnPage /> },
  { path: "/step/:id", element: <StepPage /> },
  { path: "/diagnosis", element: <Diagnosis /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
