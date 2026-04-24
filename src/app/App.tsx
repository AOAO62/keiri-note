import React, { useState, useEffect } from "react";
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

// --- ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- データ ---
const STEPS = [
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！" },
  { id: 2, title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるものを確認", "「何代」なのか大まかに分類する"], advice: "「これって経費？」と迷ったら、診断機能を使ってみてくださいね。" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { id: 5, title: "完了！", tasks: ["残高が合っているか確認する", "レシートを保管ボックスへ"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

// --- 保存用ヘルパー関数 ---
const getSavedProgress = () => {
  const saved = localStorage.getItem("keiri_progress");
  return saved ? JSON.parse(saved) : {};
};

// --- ページ1: トップページ ---
const TopPage = () => {
  const [progress, setProgress] = useState(getSavedProgress());

  // 全タスクのうち何個チェックされているか計算
  const totalTasks = STEPS.reduce((acc, step) => acc + step.tasks.length, 0);
  const completedTasks = Object.values(progress).filter(val => val === true).length;
  
  // ステップごとの完了判定（そのステップの全タスクが完了しているか）
  const completedStepsCount = STEPS.filter(step => 
    step.tasks.every(task => progress[`${step.id}-${task}`])
  ).length;

  const getTitle = () => {
    if (completedStepsCount === 5) return "経理の達人 🏆";
    if (completedStepsCount >= 3) return "経理のひよこ 🐣";
    return "経理の見習い 🐾";
  };

  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <span style={{ backgroundColor: theme.mint, color: "white", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
            現在の称号：{getTitle()}
          </span>
        </div>

        {/* コーヒーカウンター */}
        <div style={{ backgroundColor: theme.lightMint, padding: "20px", borderRadius: "16px", marginBottom: "30px", textAlign: "center", border: `2px solid ${theme.mint}` }}>
          <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>今月のクリア報酬 ☕️</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: theme.mint }}>
            {completedStepsCount === 5 ? "全ステップ完了！ご褒美タイム☕️" : `ご褒美まで あと ${5 - completedStepsCount} Step`}
          </div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>進捗率: {Math.round((completedTasks/totalTasks)*100)}%</div>
          <progress value={completedTasks} max={totalTasks} style={{ width: "100%", height: "10px", marginTop: "10px" }}></progress>
        </div>

        <div style={{ display: "grid", gap: "15px", marginBottom: "40px" }}>
          <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
          <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 からはじめる →</Link>
        </div>

        <section>
          <h3 style={{ fontSize: "18px", marginBottom: "15px", borderLeft: `4px solid ${theme.mint}`, paddingLeft: "10px" }}>Step別アドバイス</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {STEPS.map((s) => {
              const isStepDone = s.tasks.every(task => progress[`${s.id}-${task}`]);
              return (
                <Link key={s.id} to={`/step/${s.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ display: "flex", gap: "15px", padding: "15px", backgroundColor: isStepDone ? "#f0fdfa" : "#fafafa", borderRadius: "12px", border: `1px solid ${isStepDone ? theme.mint : theme.border}` }}>
                    <div style={{ textAlign: "center", minWidth: "45px" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: isStepDone ? theme.mint : "#ccc" }}>{isStepDone ? "✅" : s.id}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{s.title}</div>
                      <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{s.advice}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

// --- ページ2: ステップ詳細 (保存ロジックを追加) ---
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
            <label key={i} style={{ display: "flex", gap: "10px", padding: "12px", border: `1px solid ${theme.border}`, borderRadius: "10px", marginBottom: "10px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={!!progress[`${num}-${t}`]} 
                onChange={() => handleCheck(t)} 
              /> 
              <span style={{ textDecoration: progress[`${num}-${t}`] ? "line-through" : "none", color: progress[`${num}-${t}`] ? "#ccc" : "inherit" }}>{t}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0 }}>{content.advice}</p>
          </div>
          <div style={{ marginTop: "30px" }}>
            {num < 5 ? <Link to={`/step/${num + 1}`} style={mainButtonStyle("#333")}>次のStepへ</Link> : <Link to="/" style={mainButtonStyle(theme.mint)}>完了してトップへ</Link>}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- 診断・Q&Aなどは前回と同様のため省略（コード全体には含めてください） ---
// ... (Diagnosis, QAPage, mainButtonStyle) ...

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", 
  backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const
});

// --- ルーター設定 ---
const router = createHashRouter([
  { path: "/", element: <TopPage /> },
  { path: "/step/:id", element: <StepPage /> },
  { path: "/diagnosis", element: <div style={{padding: "40px", textAlign: "center"}}>診断ページ<br/><Link to="/">戻る</Link></div> },
  { path: "/qa", element: <div style={{padding: "40px", textAlign: "center"}}>Q&Aページ<br/><Link to="/">戻る</Link></div> },
  { path: "*", element: <Navigate to="/" /> },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
