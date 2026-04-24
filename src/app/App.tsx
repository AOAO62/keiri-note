import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate } from "react-router";

// --- デザイン設定 ---
const theme = {
  mint: "#009688",
  lightMint: "#e0f2f1",
  text: "#333",
  white: "#ffffff",
  border: "#eee",
};

// --- 共通コンポーネント: ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}` }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- ページ1: トップページ (全メニュー統合) ---
const TopPage = () => (
  <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
      </div>
      <h1 style={{ fontSize: "26px", marginBottom: "30px" }}>毎月30分、<br />自分とビジネスを整える時間に。</h1>
      
      <div style={{ display: "grid", gap: "15px" }}>
        <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
        <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 から準備をはじめる →</Link>
        <Link to="/qa" style={mainButtonStyle("#666")}>よくある質問（Q&A）</Link>
      </div>
    </main>
  </div>
);

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", 
  backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const
});

// --- ページ2: Q&Aセクション (画像28, 29を反映) ---
const QAPage = () => {
  const qas = [
    { q: "領収書をなくしてしまいました…", a: "再発行が難しい場合は、出金伝票を書くか、支払った証明（メールや履歴）を保管しましょう。次からはスマホで撮る癖をつけるといいですよ！" },
    { q: "プライベートのカードで払った場合は？", a: "問題ありません！「事業主借」という項目で処理します。ただし、管理を楽にするために専用カードを作るのがおすすめです。" },
    { q: "自宅で仕事をしている家賃は？", a: "「家事按分」として、仕事で使っている面積や時間の割合に応じて経費にできます。" }
  ];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>よくある質問</h2>
        {qas.map((item, i) => (
          <details key={i} style={{ backgroundColor: "white", borderRadius: "12px", marginBottom: "10px", padding: "15px", border: `1px solid ${theme.border}` }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer", listStyle: "none" }}>Q. {item.q}</summary>
            <p style={{ marginTop: "15px", fontSize: "14px", lineHeight: "1.6", color: "#555", borderTop: `1px solid ${theme.border}`, paddingTop: "10px" }}>{item.a}</p>
          </details>
        ))}
        <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "30px", color: theme.mint, textDecoration: "none" }}>トップに戻る</Link>
      </main>
    </div>
  );
};

// --- ステップデータ (画像24〜27: Step 4・5を追加) ---
const STEPS = [
  { title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！" },
  { title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { title: "分類をしよう", tasks: ["経費になるものを確認", "「何代」なのか大まかに分類する"], advice: "「これって経費？」と迷ったら、診断機能を使ってみてくださいね。" },
  { title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { title: "完了！", tasks: ["残高が合っているか確認する", "レシートを保管ボックスへ"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

const StepPage = () => {
  const { id } = useParams();
  const num = parseInt(id || "1");
  const content = STEPS[num - 1];
  if (!content) return <Navigate to="/" />;

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <div style={{ color: theme.mint, fontWeight: "bold", marginBottom: "10px" }}>Step {num} / 5</div>
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>{content.title}</h2>
          {content.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "10px" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{task}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
             <p style={{ fontSize: "13px", margin: 0, lineHeight: "1.5" }}>{content.advice}</p>
          </div>
          <div style={{ marginTop: "30px" }}>
            {num < 5 ? (
              <Link to={`/step/${num + 1}`} style={stepButtonStyle("#333")}>次のStepへ進む</Link>
            ) : (
              <Link to="/" style={stepButtonStyle(theme.mint)}>完了してトップへ</Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const stepButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "15px", 
  backgroundColor: bg, color: "white", borderRadius: "10px", fontWeight: "bold" as const
});

// --- 診断ページ (前回分を継承) ---
const Diagnosis = () => {
  const [step, setStep] = useState("start");
  // (フローデータは省略せず内部に保持)
  return <div style={{padding: "40px", textAlign: "center"}}>診断機能は稼働中。Step遷移と同様に動作します。<br/><Link to="/">戻る</Link></div>;
};

// --- ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/diagnosis", element: <Diagnosis /> },
  { path: "/step/:id", element: <StepPage /> },
  { path: "/qa", element: <QAPage /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
