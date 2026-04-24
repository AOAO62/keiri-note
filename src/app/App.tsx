import React from "react";
import ReactDOM from "react-dom/client"; // ← これが必要です
import { RouterProvider, createHashRouter } from "react-router-dom";

// ルーターの設定（createHashRouterに変更）
const router = createHashRouter([
  {
    path: "/",
    element: (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#333" }}>ケイリノート</h1>
        <p>プログラムの読み込みに成功しました！</p>
        <p style={{ color: "green", fontWeight: "bold" }}>これが表示されていれば、土台は完成です。</p>
      </div>
    ),
  }
]);

// 実際に画面に描き出すための「実行スイッチ」
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
