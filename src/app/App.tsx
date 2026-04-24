import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate } from "react-router";

// --- デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  white: "#ffffff",
  accent: "#ff9800",
};

// --- 共通コンポーネント: ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- 診断ロジック（画像20-23のフローを再現） ---
const Diagnosis = () => {
  const [step, setStep] = useState("start");

  // フローの分岐定義
  const flow: any = {
    start: {
      q: "その支払いは、仕事に関係ありますか？",
      yes: "who",
      no: "result_private"
    },
    who: {
      q: "それは「1人」でしたか？「誰かと一緒」でしたか？",
      choices: [
        { label: "1人で", next: "what" },
        { label: "誰かと", next: "what_group" }
      ]
    },
    what: {
      q: "何にお金を使いましたか？",
      choices: [
        { label: "モノを買った", next: "result_shoumou" },
        { label: "サービスを受けた", next: "result_service" }
      ]
    },
    what_group: {
      q: "そのお相手は誰ですか？",
      choices: [
        { label: "取引先など", next: "result_settai" },
        { label: "従業員", next: "result_fukuri" }
      ]
    },
    // 結果画面
    result_private: { title: "家計の支出", desc: "仕事に関係ないものは、経費には入れられません。「個人用」として管理しましょう。", icon: "🏠" },
    result_shoumou: { title: "消耗品費", desc: "事務用品や備品など、10万円未満のモノはこちらです。", icon: "📦" },
    result_service: { title: "支払手数料 / 広告費", desc: "受けたサービスの内容に応じて分類しましょう。", icon: "🛠" },
    result_settai: { title: "接待交際費", desc: "取引先との飲食や贈り物などが該当します。", icon: "🤝" },
    result_fukuri: { title: "福利厚生費", desc: "従業員全員を対象とした慶弔見舞金やレクリエーション費用などです。", icon: "🎈" }
  };

  const current = flow[step];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "40px" }}>🐻‍❄️</span>
            <p style={{ color: theme.mint, fontWeight: "bold", fontSize: "14px" }}>シロクマ先生の経費診断</p>
          </div>

          {current.q ? (
            <>
              <h2 style={{ fontSize: "20px", marginBottom: "30px", lineHeight: "1.5" }}>{current.q}</h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {current.choices ? (
                  current.choices.map((c: any, i: number) => (
                    <button key={i} onClick={() => setStep(c.next)} style={buttonStyle}>{c.label}</button>
                  ))
                ) : (
                  <>
                    <button onClick={() => setStep(current.yes)} style={buttonStyle}>はい</button>
                    <button onClick={() => setStep(current.no)} style={buttonStyle}>いいえ</button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ animation: "fadeIn 0.5s" }}>
              <span style={{ fontSize: "60px" }}>{current.icon}</span>
              <h2 style={{ color: theme.mint, marginTop: "20px" }}>{current.title}</h2>
              <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#666", margin: "20px 0" }}>{current.desc}</p>
              <button onClick={() => setStep("start")} style={{ background: "none", border: `1px solid ${theme.mint}`, color: theme.mint, padding: "10px 20px", borderRadius: "20px", cursor: "pointer" }}>もう一度診断する</button>
            </div>
          )}
        </div>
        <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "30px", color: "#888", textDecoration: "none" }}>← トップに戻る</Link>
      </main>
    </div>
  );
};

const buttonStyle = {
  padding: "20px",
  backgroundColor: "white",
  border: `2px solid ${theme.lightMint}`,
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: "bold" as const,
  cursor: "pointer",
  transition: "0.2s",
  boxShadow: "0 4px 0 #e0f2f1",
};

// --- 他のページは前回と同様 ---
const TopPage = () => (
  <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
      </div>
      <h1 style={{ fontSize: "26px", marginBottom: "30px" }}>毎月30分、<br />自分とビジネスを整える時間に。</h1>
      
      <Link to="/diagnosis" style={{ display: "block", textAlign: "center", textDecoration: "none", padding: "20px", backgroundColor: theme.mint, color: "white", borderRadius: "15px", fontWeight: "bold", marginBottom: "15px" }}>
        これって経費？診断をはじめる 🐻‍❄️
      </Link>
      
      <Link to="/step/1" style={{ display: "block", textAlign: "center", textDecoration: "none", padding: "20px", backgroundColor: "#333", color: "white", borderRadius: "15px", fontWeight: "bold" }}>
        Step 1 から準備をはじめる →
      </Link>
    </main>
  </div>
);

// --- ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/diagnosis", element: <Diagnosis /> },
  { path: "/step/:id", element: <div style={{padding: "20px", textAlign: "center"}}>Stepページは構築中です。<Link to="/">戻る</Link></div> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
