import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, useNavigate } from "react-router";

// --- デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  gray: "#f5f5f5",
  white: "#ffffff",
};

// --- 共通コンポーネント: ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </div>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- 共通コンポーネント: ステップバー ---
const StepBar = ({ current }: { current: number }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "20px", maxWidth: "400px", margin: "0 auto", position: "relative" }}>
    <div style={{ position: "absolute", top: "35px", left: "40px", right: "40px", height: "2px", backgroundColor: "#eee", zIndex: 1 }} />
    <div style={{ position: "absolute", top: "35px", left: "40px", width: `${(current - 1) * 25}%`, height: "2px", backgroundColor: theme.mint, zIndex: 1, transition: "0.3s" }} />
    {[1, 2, 3, 4, 5].map((s) => (
      <div key={s} style={{
        width: "30px", height: "30px", borderRadius: "50%", border: `2px solid ${current >= s ? theme.mint : "#ccc"}`,
        backgroundColor: "white", color: current >= s ? theme.mint : "#ccc", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 2, fontSize: "12px", fontWeight: "bold"
      }}>{s}</div>
    ))}
  </div>
);

// --- ページ1: トップページ (画像 c044a3 / c03d78) ---
const TopPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
        </div>
        <div style={{ backgroundColor: theme.lightMint, color: theme.mint, display: "inline-block", padding: "4px 12px", borderRadius: "15px", fontSize: "12px", marginBottom: "15px" }}>● 経理は難しくない 🐻‍❄️</div>
        <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>毎月30分、<br />自分とビジネスを整える時間に。</h1>
        <button onClick={() => navigate("/step/1")} style={{ width: "100%", padding: "18px", backgroundColor: theme.mint, color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>さっそくStep 1から始める →</button>
        
        {/* メニュータイル (画像 c03d78 の再現) */}
        <div style={{ marginTop: "30px", display: "grid", gap: "15px" }}>
          {[
            { icon: "👛", title: "まずは何を準備すればいい？", desc: "専用口座とカードから始めよう" },
            { icon: "❓", title: "これって経費になる？", desc: "よくある支出のOK/NGを判定" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "20px", border: "1px solid #eee", borderRadius: "15px", display: "flex", gap: "15px", alignItems: "center" }}>
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- ページ2: ステップ詳細 (画像 c03d3a / c03cdf / c039fb) ---
const StepPage = ({ stepNum }: { stepNum: number }) => {
  const navigate = useNavigate();
  const stepContent = [
    {
      title: "準備をしよう",
      tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"],
      advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！"
    },
    {
      title: "整理をしよう",
      tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる", "領収書をダウンロードする"],
      advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！"
    },
    {
      title: "チェックしよう",
      tasks: ["経費になるもの・ならないものを確認", "「何代」なのか大まかに分類する"],
      advice: "「これって経費？」と迷ったら、Q&Aページで検索してみましょう！"
    }
  ][stepNum - 1];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <StepBar current={stepNum} />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h3 style={{ borderLeft: `4px solid ${theme.mint}`, paddingLeft: "10px", marginBottom: "20px" }}>やることリスト</h3>
          {stepContent.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: "1px solid #eee", borderRadius: "12px", marginBottom: "10px", cursor: "pointer" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{task}</span>
            </label>
          ))}
          
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", alignItems: "flex-start" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "30px" }}>🐻‍❄️</span>
              <div style={{ fontSize: "10px", color: "white", backgroundColor: theme.mint, padding: "2px 4px", borderRadius: "4px" }}>先生</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "#e0f2f1", padding: "15px", borderRadius: "0 15px 15px 15px", fontSize: "13px", lineHeight: "1.6", position: "relative" }}>
              {stepContent.advice}
            </div>
          </div>

          <button 
            onClick={() => stepNum < 3 ? navigate(`/step/${stepNum + 1}`) : navigate("/")}
            style={{ width: "100%", marginTop: "30px", padding: "15px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}
          >
            {stepNum < 3 ? "次のStepへ進む" : "トップに戻る"}
          </button>
        </div>
      </main>
    </div>
  );
};

// --- ルーター ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/step/1", element: <StepPage stepNum={1} /> },
  { path: "/step/2", element: <StepPage stepNum={2} /> },
  { path: "/step/3", element: <StepPage stepNum={3} /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
