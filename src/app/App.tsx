import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";

// 設定をすべてこのファイル内にまとめ、外部の routes.tsx を探さないようにします
const router = createBrowserRouter([
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
], {
  basename: "/keiri-note",
});

export default function App() {
  return <RouterProvider router={router} />;
}
