import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, useNavigate, useParams } from "react-router";

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
    <div style={{ position: "absolute", top: "35px", left: "40px", width: `${((current - 1) / 4) * 100}%`, height: "2px", backgroundColor: theme.mint, zIndex: 1, transition: "0.3s" }} />
    {[1, 2, 3, 4, 5].map((s) => (
      <div key={s} style={{
        width: "30px", height: "30px", borderRadius: "50%", border: `2px solid ${current >= s ? theme.mint : "#ccc"}`,
        backgroundColor: "white", color: current >= s ? theme.mint : "#ccc", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 2, fontSize: "12px", fontWeight: "bold"
      }}>{s}</div>
    ))}
  </div>
);

// --- ステップデータ ---
const STEPS = [
  { title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！" },
  { title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる", "領収書をダウンロードする"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { title: "チェックしよう", tasks: ["経費になるものを確認", "「何代」なのか大まかに分類する"], advice: "「これって経費？」と迷ったら、Q&Aページで検索してみましょう！" },
  { title: "入力をしよう", tasks: ["会計ソフトを開く", "売上を入力する", "経費を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { title: "完了！", tasks: ["残高が合っているか確認する", "レシートを保管ボックスへ"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

// --- ページ: トップ ---
const TopPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
        </div>
        <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>毎月30分、<br />自分とビジネスを整える時間に。</h1>
        <button onClick={() => navigate("/step/1")} style={{ width: "100%", padding: "18px", backgroundColor: theme.mint, color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>さっそくStep 1から始める →</button>
      </main>
    </div>
  );
};

// --- ページ: 各ステップ ---
const StepPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const num = parseInt(id || "1");
  const content = STEPS[num - 1];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <StepBar current={num} />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "20px" }}>Step {num}: {content.title}</h3>
          {content.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: "1px solid #eee", borderRadius: "12px", marginBottom: "10px" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{task}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
             <p style={{ fontSize: "13px", margin: 0 }}>{content.advice}</p>
          </div>
          <button 
            onClick={() => num < 5 ? navigate(`/step/${num + 1}`) : navigate("/")}
            style={{ width: "100%", marginTop: "30px", padding: "15px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}
          >
            {num < 5 ? "次のStepへ進む" : "完了してトップへ"}
          </button>
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
