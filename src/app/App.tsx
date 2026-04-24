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
  accent: "#ff9800",
};

// --- 共通コンポーネント: ヘッダー ---
const Header = () => (
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- データ: ステップ情報 ---
const STEPS = [
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！" },
  { id: 2, title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるものを確認", "「何代」なのか大まかに分類する"], advice: "「これって経費？」と迷ったら、診断機能を使ってみてくださいね。" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { id: 5, title: "完了！", tasks: ["残高が合っているか確認する", "レシートを保管ボックスへ"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

// --- ページ1: トップページ ---
const TopPage = () => {
  const [completedCount, setCompletedCount] = useState(0);
  
  // 擬似的に完了状況を表示（本来はlocalStorageなどで保持）
  const month = new Date().getMonth() + 1;

  return (
    <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        
        {/* 月替わりアラート */}
        <div style={{ backgroundColor: "#fff9c4", padding: "12px", borderRadius: "12px", marginBottom: "20px", fontSize: "13px", display: "flex", gap: "10px", alignItems: "center" }}>
          <span>🔔</span>
          <span>{month}月ですね！{month === 4 ? "新年度の準備もシロクマ先生と一緒に進めましょう。" : "今月もコツコツ整えていきましょうね。"}</span>
        </div>

        <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
        </div>

        <div style={{ display: "grid", gap: "15px", marginBottom: "30px" }}>
          <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
          <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 から準備をはじめる →</Link>
        </div>

        {/* ご褒美カウンター */}
        <div style={{ backgroundColor: theme.lightMint, padding: "20px", borderRadius: "16px", marginBottom: "40px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px" }}>今月のクリア報酬 ☕️</div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: theme.mint }}>ご褒美コーヒーまで あと {5 - completedCount} Step</div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>全部終わったら美味しい1杯を飲みましょう！</div>
        </div>

        {/* Step別アドバイス一覧 */}
        <section style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "18px", marginBottom: "15px", borderLeft: `4px solid ${theme.mint}`, paddingLeft: "10px" }}>Step別アドバイス</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {STEPS.map((s) => (
              <Link key={s.id} to={`/step/${s.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", gap: "15px", padding: "15px", backgroundColor: "#fafafa", borderRadius: "12px", border: `1px solid ${theme.border}` }}>
                  <div style={{ textAlign: "center", minWidth: "45px" }}>
                    <div style={{ fontSize: "10px", color: theme.mint, fontWeight: "bold" }}>Step</div>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: theme.mint }}>{s.id}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>{s.title}</div>
                    <p style={{ fontSize: "12px", color: "#666", margin: 0, lineHeight: "1.4" }}>{s.advice}</p>
                  </div>
                  <div style={{ alignSelf: "center", color: "#ccc" }}>＞</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Link to="/qa" style={{ display: "block", textAlign: "center", color: "#888", fontSize: "14px", textDecoration: "none", padding: "20px", border: `1px solid ${theme.border}`, borderRadius: "12px" }}>
          🤔 よくある質問（Q&A）はこちら
        </Link>
      </main>
    </div>
  );
};

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", 
  backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const,
  boxShadow: "0 4px 0 rgba(0,0,0,0.1)"
});

// --- ページ2: 診断機能 ---
const Diagnosis = () => {
  const [step, setStep] = useState("start");
  const flow: any = {
    start: { q: "その支払いは仕事に関係ありますか？", yes: "who", no: "res_p" },
    who: { q: "「1人」でしたか？「誰かと一緒」でしたか？", choices: [{ l: "1人で", n: "what" }, { l: "誰かと", n: "w_g" }] },
    what: { q: "何にお金を使いましたか？", choices: [{ l: "モノを買った", n: "res_s" }, { l: "サービスを受けた", n: "res_v" }] },
    w_g: { q: "そのお相手は誰ですか？", choices: [{ l: "取引先など", n: "res_k" }, { l: "従業員", n: "res_f" }] },
    res_p: { t: "家計の支出", i: "🏠", d: "仕事に関係ないものは経費になりません。" },
    res_s: { t: "消耗品費", i: "📦", d: "10万円未満の事務用品などはこちらです。" },
    res_v: { t: "支払手数料", i: "🛠", d: "振込手数料やサービス利用料などが該当します。" },
    res_k: { t: "接待交際費", i: "🤝", d: "取引先との飲食や手土産代です。" },
    res_f: { t: "福利厚生費", i: "🎈", d: "従業員のための慶弔見舞金などです。" }
  };
  const curr = flow[step];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "30px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          {curr.q ? (
            <>
              <p style={{fontSize: "40px"}}>🐻‍❄️</p>
              <h2 style={{fontSize: "18px", marginBottom: "30px", lineHeight: "1.5"}}>{curr.q}</h2>
              <div style={{display: "grid", gap: "10px"}}>
                {curr.choices ? curr.choices.map((c:any, i:number) => (
                  <button key={i} onClick={() => setStep(c.n)} style={diagBtnStyle}>{c.l}</button>
                )) : (
                  <div style={{display: "flex", gap: "10px"}}>
                    <button onClick={() => setStep(curr.yes)} style={diagBtnStyle}>はい</button>
                    <button onClick={() => setStep(curr.no)} style={diagBtnStyle}>いいえ</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{animation: "fadeIn 0.5s"}}>
              <p style={{fontSize: "60px"}}>{curr.i}</p>
              <h2 style={{color: theme.mint, marginBottom: "10px"}}>{curr.t}</h2>
              <p style={{fontSize: "14px", color: "#666", marginBottom: "30px"}}>{curr.d}</p>
              <button onClick={() => setStep("start")} style={{background: "none", border: `1px solid ${theme.mint}`, color: theme.mint, padding: "10px 20px", borderRadius: "20px"}}>もう一度診断する</button>
            </div>
          )}
        </div>
        <Link to="/" style={{display: "block", textAlign: "center", marginTop: "30px", color: "#888", textDecoration: "none"}}>← トップに戻る</Link>
      </main>
    </div>
  );
};

const diagBtnStyle = { width: "100%", padding: "15px", borderRadius: "12px", border: `2px solid ${theme.lightMint}`, backgroundColor: "white", fontWeight: "bold" as const, cursor: "pointer" };

// --- ページ3: ステップ詳細 ---
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
          <div style={{ color: theme.mint, fontWeight: "bold", marginBottom: "5px" }}>Step {num} / 5</div>
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>{content.title}</h2>
          {content.tasks.map((t, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "10px", cursor: "pointer" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{t}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span style={{fontSize: "24px"}}>🐻‍❄️</span>
             <p style={{ fontSize: "13px", margin: 0, lineHeight: "1.5" }}>{content.advice}</p>
          </div>
          <div style={{ marginTop: "30px" }}>
            {num < 5 ? <Link to={`/step/${num + 1}`} style={mainButtonStyle("#333")}>次のStepへ進む</Link> : <Link to="/" style={mainButtonStyle(theme.mint)}>今月の経理を完了する！</Link>}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- ページ4: Q&A ---
const QAPage = () => (
  <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>よくある質問</h2>
      <div style={{ display: "grid", gap: "10px" }}>
        {["領収書をなくした", "プライベート用カードで払った", "家賃の按分について"].map((q, i) => (
          <details key={i} style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px", border: `1px solid ${theme.border}` }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>{q}</summary>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>ここにシロクマ先生の回答が入ります。経理は完璧じゃなくても大丈夫ですよ！</p>
          </details>
        ))}
      </div>
      <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "30px", color: theme.mint }}>トップに戻る</Link>
    </main>
  </div>
);

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
