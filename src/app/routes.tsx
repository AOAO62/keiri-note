import { createHashRouter } from "react-router-dom";

// ※ここには、実際に表示させたいコンポーネントをインポートします
// 例として App を読み込む形にしています。環境に合わせて書き換えてください。
import App from "../App"; 

export const router = createHashRouter([
  {
    path: "/",
    element: <App />, // ここが最初の画面になります
  },
  // 他にページ（画面）がある場合は、ここに追加していきます
]);
