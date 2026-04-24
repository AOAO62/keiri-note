import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams } from "react-router";

// --- デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  white: "#ffffff",
};

// --- 共通コンポーネント: ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理의ノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- ステップデータ ---
const STEPS = [
  { title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業が楽になりますよ！" },
  { title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる"], advice: "月ごとにまとめておくだけでOKです！" },
  { title: "チェックしよう", tasks: ["経費になるものを確認", "大まかに分類する"], advice: "迷ったらQ&Aページで検索！" },
  { title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "コーヒーを片手に一気にやっちゃいましょう。" },
  { title: "完了！", tasks: ["残高を確認する", "レシートを保管する"], advice: "今月もお疲れ様でした！自分にご褒美を🍰" },
];

// --- ページ: トップ ---
const TopPage = () => (
  <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px" }}>
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%" }} />
      </div>
      <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>毎月30分、<br />自分とビジネスを整える時間に。</h1>
      <Link to="/step/1" style={{ 
        display: "block", textAlign: "center", textDecoration: "none", padding: "18px", 
        backgroundColor: theme.mint, color: "white", borderRadius: "12px", fontSize: "16px", fontWeight: "bold" 
      }}>
        さっそくStep 1から始める →
      </Link>
    </main>
  </div>
);

// --- ページ: 各ステップ ---
const StepPage = () => {
  const { id } = useParams();
  const num = parseInt(id || "1");
  const content = STEPS[num - 1];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "20px" }}>Step {num}: {content.title}</h3>
          {content.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: "1px solid #eee", borderRadius: "12px", marginBottom: "10px" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{task}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0 }}>{content.advice}</p>
          </div>
          
          <div style={{ marginTop: "30px" }}>
            {num < 5 ? (
              <Link to={`/step/${num + 1}`} style={{ 
                display: "block", textAlign: "center", textDecoration: "none", padding: "15px", 
                backgroundColor: "#333", color: "white", borderRadius: "10px", fontWeight: "bold" 
              }}>次のStepへ進む</Link>
            ) : (
              <Link to="/" style={{ 
                display: "block", textAlign: "center", textDecoration: "none", padding: "15px", 
                backgroundColor: theme.mint, color: "white", borderRadius: "10px", fontWeight: "bold" 
              }}>完了してトップへ</Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/step/:id", element: <StepPage /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
