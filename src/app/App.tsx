import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, useNavigate } from "react-router";

// --- デザイン設定（画像13・14の仕様より） ---
const theme = {
  mint: "#009688",      // メインのミントグリーン
  lightMint: "#e0f2f1", // 背景用の薄い緑
  text: "#333",
  white: "#ffffff",
};

// --- アニメーション用スタイル ---
const slideInStyle = {
  animation: "slideIn 0.4s ease-out",
};

const globalStyles = `
  @keyframes slideIn {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  body { margin: 0; font-family: 'Hiragino Kaku Gothic ProN', sans-serif; color: #333; }
`;

// --- コンポーネント: トップページ (画像15の再現) ---
const TopPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
          <strong style={{ fontSize: "18px" }}>経理のノート</strong>
        </div>
        <div style={{ fontSize: "20px" }}>☰</div>
      </header>

      <main style={{ padding: "40px 20px", textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
        {/* メインビジュアル（コーヒーのイメージ） */}
        <div style={{ width: "100%", height: "250px", backgroundColor: "#f9f9f9", borderRadius: "20px", marginBottom: "30px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=500" alt="Coffee" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
        </div>

        <div style={{ display: "inline-block", backgroundColor: theme.lightMint, color: theme.mint, padding: "4px 12px", borderRadius: "15px", fontSize: "12px", marginBottom: "20px" }}>
          ● 経理は難しくない 🐻‍❄️
        </div>

        <h1 style={{ fontSize: "28px", lineHeight: "1.4", marginBottom: "20px" }}>
          毎月30分、<br />
          自分とビジネスを整える<br />
          時間に。
        </h1>

        <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.8", marginBottom: "40px" }}>
          期限ギリギリで焦らないために、まずは月1回、コーヒーを飲みながら数字をチェックする習慣をつけましょう！
        </p>

        <button 
          onClick={() => navigate("/diagnosis")}
          style={{ width: "100%", padding: "18px", backgroundColor: theme.mint, color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          さっそくStep 1から始める <span>→</span>
        </button>
      </main>
      <style>{globalStyles}</style>
    </div>
  );
};

// --- コンポーネント: 診断ページ (画像13・14の仕様) ---
const DiagnosisPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const questions = [
    { q: "その支払いは、仕事に関係ありますか？", yes: 1, no: "private" },
    { q: "1人でしたか？ 誰かと一緒でしたか？", yes: 2, no: "reception", yesLabel: "1人で", noLabel: "誰かと" },
    { q: "モノを買いましたか？ サービスを受けましたか？", yes: "consumable", no: "service", yesLabel: "モノ", noLabel: "サービス" },
  ];

  const handleAnswer = (nextStep: any) => {
    setStep(nextStep);
  };

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "white", borderRadius: "24px", padding: "30px", minHeight: "400px", position: "relative" }}>
        <button onClick={() => navigate("/")} style={{ border: "none", background: "none", color: "#999", cursor: "pointer", marginBottom: "20px" }}>← 戻る</button>
        
        <div key={step} style={slideInStyle}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span style={{ fontSize: "50px" }}>🐻‍❄️</span>
            <p style={{ color: theme.mint, fontWeight: "bold" }}>シロクマ先生の解説</p>
          </div>

          {typeof step === "number" ? (
            <>
              <h2 style={{ fontSize: "20px", textAlign: "center", marginBottom: "40px" }}>{questions[step].q}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <button onClick={() => handleAnswer(questions[step].yes)} style={diagnosisButtonStyle}>{questions[step].yesLabel || "Yes"}</button>
                <button onClick={() => handleAnswer(questions[step].no)} style={diagnosisButtonStyle}>{questions[step].noLabel || "No"}</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: theme.mint }}>判定結果：{step === "private" ? "家計簿へ" : "【消耗品費】"}</h2>
              <p>画像14の仕様に基づき、ここに詳細が表示されます。</p>
              <button onClick={() => setStep(0)} style={{ marginTop: "20px", padding: "10px", borderRadius: "10px", border: "1px solid #ddd" }}>やり直す</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const diagnosisButtonStyle = {
  padding: "40px 20px",
  backgroundColor: "white",
  border: `2px solid #eee`,
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: "bold" as const,
  cursor: "pointer",
  boxShadow: "0 4px 0 #eee",
};

const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/diagnosis", element: <DiagnosisPage /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
