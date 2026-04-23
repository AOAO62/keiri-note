import { RouterProvider, createBrowserRouter } from "react-router";

// ↓ 外部ファイルを使わず、この中で直接設定を書く形にしました
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>ケイリノートへようこそ</h1>
        <p>現在、画面を構築中です...</p>
      </div>
    ), 
  }
], {
  basename: "/keiri-note",
});

export default function App() {
  return <RouterProvider router={router} />;
}
