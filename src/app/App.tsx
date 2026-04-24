import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate } from "react-router";

// --- 1. デザイン・データ設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  white: "#ffffff",
  border: "#eee",
};

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

// --- 2. ヘルパー関数 ---
const getSavedProgress = () => {
  try {
    const saved = localStorage.getItem("keiri_progress");
    return saved ? JSON.parse(saved) : {};
  } catch (e) { return {}; }
};

// --- 3. 共通コンポーネント ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const, boxShadow: "0 4px 0 rgba(0,0,0,0.1)"
});

// --- 4. 各ページコンポーネント ---

// 格言一覧ページ
const ColumnPage = () => (
  <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "30px", textAlign: "center" }}>
        <h2 style={{ color: theme.mint }}>シロクマ格言集</h2>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          {MESSAGES.map((m, i) => (
            <div key={i} style={{ padding: "15px 0", borderBottom: `1px solid ${theme.border}` }}>🐻‍❄️ {m}</div>
          ))}
        </div>
        <Link to="/" style={{ ...mainButtonStyle(theme.mint), marginTop: "30px" }}>戻る</Link>
      </div>
    </main>
  </div>
);

// よくある質問ページ
const QAPage = () => {
  const qas = [
    { q: "領収書をなくした時は？", a: "再発行できない場合は「出金伝票」を書きましょう。" },
    { q: "プライベートのカードで払った？", a: "「事業主借」として処理すればOKです。" },
    { q: "家賃の按分はどうする？", a: "仕事で使っている面積や時間の割合で計算します。" }
  ];
  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>よくある質問</h2>
        {qas.map((item, i) => (
          <details key={i} style={{ backgroundColor: "white", borderRadius: "12px", marginBottom: "10px", padding: "15px" }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>Q. {item.q}</summary>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#555", borderTop: "1px solid #eee", paddingTop: "10px" }}>🐻‍❄️ {item.a}</p>
          </details>
        ))}
        <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "30px", color: theme.mint }}>戻る</Link>
      </main>
    </div>
  );
};

// 診断ページ
const Diagnosis = () => (
  <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh", textAlign: "center" }}>
    <Header />
    <main style={{ padding: "40px" }}>
      <h2>経費診断 🐻‍❄️</h2>
      <p>準備中です。トップページに戻りましょう。</p>
      <Link to="/" style={{ color: theme.mint }}>戻る</Link>
    </main>
  </div>
);

// ステップ詳細ページ
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
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}>
          <h2 style={{ marginBottom: "20px" }}>Step {num}: {content.title}</h2>
          {content.tasks.map((t, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "12px", border: `1px solid ${theme.border}`, borderRadius: "10px", marginBottom: "10px" }}>
              <input type="checkbox" checked={!!progress[`${num}-${t}`]} onChange={() => handleCheck(t)} /> <span>{t}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0 }}>{content.advice}</p>
          </div>
          <Link to="/" style={{ ...mainButtonStyle(theme.mint), marginTop: "30px" }}>トップへ戻る</Link>
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
        
        {/* 格言エリア（合同記号の代わり） */}
        <Link to="/column" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ textAlign: "center", padding: "15px", border: `2px solid ${theme.lightMint}`, borderRadius: "15px", marginBottom: "20px", backgroundColor: "#fdfdfd" }}>
            <span style={{ fontSize: "11px", color: theme.mint, fontWeight: "bold", display: "block", marginBottom: "4px" }}>SHIROKUMA COLUMN</span>
            <strong style={{ fontSize: "15px" }}>「{luckyMsg}」</strong>
          </div>
        </Link>

        {/* 称号 */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <span style={{ backgroundColor: theme.mint, color: "white", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
            称号：{completedStepsCount === 5 ? "経理の達人 🏆" : completedStepsCount >= 3 ? "ひよこ 🐣" : "見習い 🐾"}
          </span>
        </div>

        {/* 画像エリア */}
        <div style={{ width: "100%", height: "200px", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", backgroundColor: theme.lightMint }}>
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" alt="main" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.currentTarget.style.display="none")} />
        </div>

        {/* カウンター */}
        <div style={{ backgroundColor: theme.lightMint, padding: "20px", borderRadius: "16px", marginBottom: "30px", textAlign: "center", border: `1px solid ${theme.mint}` }}>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>ご褒美コーヒーまで</div>
          <div style={{ fontSize: "22px", fontWeight: "bold", color: theme.mint, margin: "5px 0" }}>あと {5 - completedStepsCount} Step</div>
          <div style={{ width: "100%", backgroundColor: "#fff", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
            <div style={{ width: `${(completedTasksCount / totalTasks) * 100}%`, backgroundColor: theme.mint, height: "100%", transition: "width 0.5s ease" }}></div>
          </div>
        </div>

        <div style={{ display: "grid", gap: "15px" }}>
          <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>経費診断 🐻‍❄️</Link>
          <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 からはじめる →</Link>
          <Link to="/qa" style={mainButtonStyle("#666")}>よくある質問 🤔</Link>
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
  { path: "/qa", element: <QAPage /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
