import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";

// --- スタイル（ノート風のデザイン） ---
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fffdf0", // 優しい紙の色
    minHeight: "90vh",
    boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    fontFamily: "'Sawarabi Gothic', sans-serif",
    borderLeft: "20px solid #e74c3c", // ノートの綴じ目
  },
  title: {
    fontSize: "24px",
    textAlign: "center" as const,
    color: "#333",
    borderBottom: "2px solid #333",
    paddingBottom: "10px",
    marginBottom: "30px",
  },
  sugoroku: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
    position: "relative" as const,
  },
  step: (active: boolean) => ({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: active ? "#e74c3c" : "#ddd",
    color: "#white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    zIndex: 2,
  }),
  line: {
    position: "absolute" as const,
    top: "20px",
    left: "0",
    right: "0",
    height: "2px",
    backgroundColor: "#ddd",
    zIndex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    lineHeight: "1.8",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "20px",
    border: "2px solid #e74c3c",
    backgroundColor: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }
};

// --- メイン画面コンポーネント ---
const KeiriNoteMain = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("お金を払いましたか？");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>経理のノート</h1>

      {/* 5ステップすごろく */}
      <div style={styles.sugoroku}>
        <div style={styles.line} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={styles.step(step >= i)}>
            {i === 5 ? "Goal" : i}
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h3>【Step {step}】仕訳を考えてみよう</h3>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Q. {question}</p>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button 
            style={styles.button} 
            onClick={() => {
              setQuestion("それは『経費』になるものですか？");
              setStep(2);
            }}
          >
            はい
          </button>
          <button 
            style={styles.button} 
            onClick={() => {
              setQuestion("売上が入ってきたということですね！");
              setStep(2);
            }}
          >
            いいえ
          </button>
        </div>
      </div>

      <p style={{ marginTop: "40px", fontSize: "12px", color: "#888", textAlign: "right" }}>
        ※ノートをめくるように、一歩ずつ進みましょう。
      </p>
    </div>
  );
};

// --- ルーター設定 ---
const router = createHashRouter([
  {
    path: "/",
    element: <KeiriNoteMain />,
  }
]);

// --- 実行 ---
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
