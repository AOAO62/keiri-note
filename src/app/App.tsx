import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";

/**
 * 【重要】もしFigmaから書き出したコードの中に 
 * 「export const routes = [...]」という部分があれば、
 * その [...] の中身をコピーして、下の routes 変数の [] の中に貼り付けてください。
 */
const routes = [
  {
    path: "/",
    element: (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#333" }}>ケイリノート</h1>
        <p>プログラムの読み込みには成功しています！</p>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          ※もし画面が真っ白な場合は、Figmaのコードをこのファイルに直接貼り付ける必要があります。
        </p>
      </div>
    ),
  },
];

const router = createBrowserRouter(routes, {
  basename: "/keiri-note",
});

export default function App() {
  return <RouterProvider router={router} />;
}
