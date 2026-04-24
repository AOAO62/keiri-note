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
  <header style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, zIndex: 100 }}>
    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "24px" }}>🐻‍❄️</span>
      <strong style={{ fontSize: "18px" }}>経理のノート</strong>
    </Link>
    <div style={{ fontSize: "20px" }}>☰</div>
  </header>
);

// --- ページ: Q&A（画像28, 29の内容を反映） ---
const QAPage = () => {
  const qas = [
    { 
      q: "領収書をなくしてしまいました…", 
      a: "大丈夫ですよ。再発行が難しい場合は「出金伝票」を作成するか、購入した際のメール、銀行の振込履歴などを保管しておきましょう。次からはスマホで写真を撮っておくと安心ですね！" 
    },
    { 
      q: "プライベートのカードで払った場合は？", 
      a: "問題ありません！会計ソフトでは「事業主借」という名前で入力すれば経費として認められます。管理をラクにするために、少しずつ事業用カードに集約していきましょう。" 
    },
    { 
      q: "自宅で仕事をしている家賃は？", 
      a: "仕事で使っているスペースの面積や、使っている時間の割合（按分）に応じて経費にできます。電気代やネット代も同じ考え方で経費にできますよ。" 
    },
    {
      q: "10万円以上のパソコンを買ったときは？",
      a: "基本的には「資産」として何年かに分けて経費にしますが、特例で一括経費にできる場合もあります。迷ったら「一括償却資産」などのキーワードで調べてみてくださいね。"
    }
  ];

  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "22px" }}>よくある質問</h2>
        
        <div style={{ display: "grid", gap: "15px" }}>
          {qas.map((item, i) => (
            <details key={i} style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: `1px solid ${theme.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <summary style={{ fontWeight: "bold", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Q. {item.q}</span>
                <span style={{ color: theme.mint }}>▼</span>
              </summary>
              <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: `1px solid ${theme.border}`, fontSize: "14px", lineHeight: "1.7", color: "#555" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>🐻‍❄️</span>
                  <span>{item.a}</span>
                </div>
              </div>
            </details>
          ))}
        </div>

        <Link to="/" style={{ display: "block", textAlign: "center", marginTop: "40px", color: theme.mint, textDecoration: "none", fontWeight: "bold" }}>
          トップに戻る
        </Link>
      </main>
    </div>
  );
};

// --- データ: ステップ情報 ---
const STEPS = [
  { id: 1, title: "準備をしよう", tasks: ["事業用の銀行口座を1つ決める", "クレジットカードを1枚決める"], advice: "口座とカードを分けるだけで、毎月の作業がグッと楽になりますよ！" },
  { id: 2, title: "整理をしよう", tasks: ["財布の中のレシートを分ける", "封筒やファイルに入れる"], advice: "レシートは綺麗に貼らなくても大丈夫。月ごとにまとめておくだけでOKです！" },
  { id: 3, title: "分類をしよう", tasks: ["経費になるものを確認", "「何代」なのか大まかに分類する"], advice: "「これって経費？」と迷ったら、診断機能を使ってみてくださいね。" },
  { id: 4, title: "入力をしよう", tasks: ["会計ソフトを開く", "売上と経費を入力する"], advice: "毎日やらなくて大丈夫！月1回、コーヒーを片手に一気にやっちゃいましょう。" },
  { id: 5, title: "完了！", tasks: ["残高が合っているか確認する", "レシートを保管ボックスへ"], advice: "数字のズレがなければ今月は完了！自分にご褒美をあげましょう🍰" },
];

// --- ページ: トップページ ---
const TopPage = () => (
  <div style={{ backgroundColor: theme.white, minHeight: "100vh" }}>
    <Header />
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#fff9c4", padding: "12px", borderRadius: "12px", marginBottom: "20px", fontSize: "13px", display: "flex", gap: "10px", alignItems: "center" }}>
        <span>🔔</span>
        <span>4月ですね！今月もシロクマ先生と一緒に、コツコツ整えていきましょうね。</span>
      </div>

      <div style={{ width: "100%", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" alt="main" style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ display: "grid", gap: "15px", marginBottom: "40px" }}>
        <Link to="/diagnosis" style={mainButtonStyle(theme.mint)}>これって経費？診断 🐻‍❄️</Link>
        <Link to="/step/1" style={mainButtonStyle("#333")}>Step 1 から準備をはじめる →</Link>
        <Link to="/qa" style={mainButtonStyle("#666")}>よくある質問（Q&A）🤔</Link>
      </div>

      <section>
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
    </main>
  </div>
);

const mainButtonStyle = (bg: string) => ({
  display: "block", textAlign: "center" as const, textDecoration: "none", padding: "20px", 
  backgroundColor: bg, color: "white", borderRadius: "15px", fontWeight: "bold" as const,
  boxShadow: "0 4px 0 rgba(0,0,0,0.1)"
});

// --- ページ: 診断（前回と同様） ---
const Diagnosis = () => {
  const [step, setStep] = useState("start");
  const flow: any = {
    start: { q: "仕事に関係ありますか？", yes: "who", no: "res_p" },
    who: { q: "誰と一緒でしたか？", choices: [{ l: "1人で", n: "what" }, { l: "誰かと", n: "w_g" }] },
    what: { q: "何を買いましたか？", choices: [{ l: "モノ", n: "res_s" }, { l: "サービス", n: "res_v" }] },
    w_g: { q: "お相手は？", choices: [{ l: "取引先", n: "res_k" }, { l: "従業員", n: "res_f" }] },
    res_p: { t: "家計の支出", i: "🏠" }, res_s: { t: "消耗品費", i: "📦" }, 
    res_v: { t: "支払手数料", i: "🛠" }, res_k: { t: "接待交際費", i: "🤝" }, res_f: { t: "福利厚生費", i: "🎈" }
  };
  const curr = flow[step];
  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "30px" }}>
          {curr.q ? (
            <>
              <p style={{fontSize: "40px"}}>🐻‍❄️</p>
              <h2 style={{fontSize: "18px", marginBottom: "30px"}}>{curr.q}</h2>
              {curr.choices ? curr.choices.map((c:any, i:number) => (
                <button key={i} onClick={() => setStep(c.n)} style={diagBtnStyle}>{c.l}</button>
              )) : (
                <div style={{display: "flex", gap: "10px"}}>
                  <button onClick={() => setStep(curr.yes)} style={diagBtnStyle}>はい</button>
                  <button onClick={() => setStep(curr.no)} style={diagBtnStyle}>いいえ</button>
                </div>
              )}
            </>
          ) : (
            <div>
              <p style={{fontSize: "60px"}}>{curr.i}</p>
              <h2 style={{color: theme.mint}}>{curr.t}</h2>
              <button onClick={() => setStep("start")} style={{marginTop: "20px", border: "1px solid #ddd", background: "none", padding: "10px", borderRadius: "10px"}}>もう一度</button>
            </div>
          )}
        </div>
        <Link to="/" style={{display: "block", marginTop: "20px", color: "#888"}}>トップへ戻る</Link>
      </main>
    </div>
  );
};

const diagBtnStyle = { width: "100%", padding: "15px", marginBottom: "10px", borderRadius: "12px", border: `2px solid ${theme.lightMint}`, backgroundColor: "white", fontWeight: "bold" as const };

// --- ページ: ステップ詳細 ---
const StepPage = () => {
  const { id } = useParams();
  const num = parseInt(id || "1");
  const content = STEPS[num - 1];
  if (!content) return <Navigate to="/" />;
  return (
    <div style={{ backgroundColor: theme.lightMint, minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "25px" }}>
          <div style={{ color: theme.mint, fontWeight: "bold" }}>Step {num} / 5</div>
          <h2 style={{ marginBottom: "20px" }}>{content.title}</h2>
          {content.tasks.map((t, i) => (
            <label key={i} style={{ display: "flex", gap: "10px", padding: "15px", border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "10px" }}>
              <input type="checkbox" /> <span style={{ fontSize: "14px" }}>{t}</span>
            </label>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "30px", backgroundColor: "#f0fdfa", padding: "15px", borderRadius: "12px" }}>
             <span>🐻‍❄️</span><p style={{ fontSize: "13px", margin: 0 }}>{content.advice}</p>
          </div>
          <div style={{ marginTop: "30px" }}>
            {num < 5 ? <Link to={`/step/${num + 1}`} style={mainButtonStyle("#333")}>次へ</Link> : <Link to="/" style={mainButtonStyle(theme.mint)}>完了！</Link>}
          </div>
        </div>
      </main>
    </div>
  );
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
