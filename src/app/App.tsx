import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter, Link, useParams, Navigate, useLocation } from "react-router";

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
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める（プライベートと分ける）", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がラクになります！" },
  { id: 2, title: "整理をしよう", tasks: ["財布の中のレシートを事業用とプライベートに分ける", "事業用のレシートを月ごとの封筒やファイルに入れる", "ネット通販の領収書をダウンロードする"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるもの・ならないものをチェックする", "「何代」なのか（交通費、会議費など）を大まかに分類する"], advice: "「これって経費？」と迷ったら、診断機能を使ってみましょう！" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトやスプレッドシートを開く", "売上（入金）を入力する", "経費（レシート・カード明細）を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { id: 5, title: "完了！", tasks: ["通帳の残高と帳簿の残高が合っているか確認する", "今月の「売上」と「経費」のバランスを見る", "レシートを保管ボックスへしまう"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

const MESSAGES = [
  "シロクマ先生は、いつでもあなたの味方です。",
  "経理を制する者は、ビジネスを制する！",
  "完璧じゃなくていい、『だいたい』で一歩前へ。",
  "レシートの山は、あなたが頑張った証拠ですよ。",
];

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
      <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Bear" alt="logo" style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: theme.lightMint }} />
      <strong style={{ fontSize: "18px", color: theme.mint }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px", cursor: "pointer" }}>☰</div>
  </header>
);

const ProgressBar = ({ currentStep }: { currentStep: number }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 10px", position: "relative" }}>
    <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "2px", backgroundColor: "#ddd", zIndex: 1 }}></div>
    <div style={{ position: "absolute", top: "50%", left: "10%", width: `${(currentStep - 1) * 20}%`, height: "2px", backgroundColor: theme.mint, zIndex: 1, transition: "width 0.3s" }}></div>
    {[1, 2, 3, 4, 5].map((s) => (
      <div key={s} style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: s <= currentStep ? theme.white : "#eee", border: `2px solid ${s <= currentStep ? theme.mint : "#ccc"}`, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: s <= currentStep ? theme.mint : "#999", fontWeight: "bold" }}>{s}</div>
    ))}
  </div>
);

const TopPage = () => {
  const [progress] = useState(getSavedProgress());
  const completedStepsCount = STEPS.filter(step => step.tasks.every(t => progress[`${step.id}-${t}`])).length;

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "15px", border: `1px solid ${theme.mint}`, borderRadius: "15px", marginBottom: "20px", backgroundColor: "#fff" }}>
          <span style={{ fontSize: "11px", color: theme.mint, fontWeight: "bold", display: "block" }}>SHIROKUMA COLUMN</span>
          <strong style={{ fontSize: "14px" }}>「{MESSAGES[0]}」</strong>
        </div>

        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <span style={{ backgroundColor: theme.mint, color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" }}>称号：見習い 🐾</span>
        </div>

        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "14px", color: "#666" }}>ご褒美コーヒーまで</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: theme.mint, margin: "8px 0" }}>あと {5 - completedStepsCount} Step</div>
            <div style={{ width: "100%", backgroundColor: "#eee", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${(completedStepsCount / 5) * 100}%`, backgroundColor: theme.mint, height: "100%" }}></div>
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
      <main style={{ padding: "0 20px 20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Step {stepNum}: {step.title}</h2>
          {step.tasks.map((task, i) => (
            <label key={i} style={{ display: "flex", gap: "12px", padding: "15px", border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "10px", alignItems: "center", cursor: "pointer", backgroundColor: progress[`${stepNum}-${task}`] ? "#f9f9f9" : "#fff" }}>
              <input type="checkbox" checked={!!progress[`${stepNum}-${task}`]} onChange={() => toggleTask(task)} style={{ width: "20px", height: "20px", accentColor: theme.mint }} />
              <span style={{ fontSize: "14px", color: progress[`${stepNum}-${task}`] ? "#ccc" : "#333", textDecoration: progress[`${stepNum}-${task}`] ? "line-through" : "none" }}>{task}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", backgroundColor: theme.lightMint, padding: "15px", borderRadius: "12px" }}>
            <span>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0 }}>{step.advice}</p>
          </div>
        </div>
        {stepNum < 5 ? (
          <Link to={`/step/${stepNum + 1}`} style={buttonStyle(theme.dark)}>次のStepへ進む</Link>
        ) : (
          <div style={{ ...cardStyle, textAlign: "center", backgroundColor: theme.lightMint }}>🎉 全ステップ完了！お疲れ様でした！</div>
        )}
        <Link to="/" style={{ display: "block", textAlign: "center", color: theme.mint, textDecoration: "none", fontSize: "14px", marginTop: "10px" }}>トップへ戻って確認</Link>
      </main>
    </div>
  );
};

const Diagnosis = () => (
  <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "40px 20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ ...cardStyle, textAlign: "center" }}>
        <h2 style={{ color: theme.mint, marginBottom: "20px" }}>これって経費？診断 🐻‍❄️</h2>
        <div style={{ textAlign: "left", fontSize: "14px", lineHeight: "1.8" }}>
          <p><strong>Q. 仕事で使うカフェ代は？</strong><br/>A. 打ち合わせならOK。一人の時は仕事に不可欠なら「雑費」等で検討。</p>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "15px 0" }} />
          <p><strong>Q. 自宅の家賃は？</strong><br/>A. 仕事で使っている面積分だけ「家事按分」として経費にできます。</p>
        </div>
        <Link to="/" style={{ ...buttonStyle(theme.mint), marginTop: "30px" }}>トップへ戻る</Link>
      </div>
    </main>
  </div>
);

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
