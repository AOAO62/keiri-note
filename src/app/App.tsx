import { RouterProvider, createBrowserRouter } from "react-router-dom";
// 隣にある routes.tsx からページの設定を読み込みます
import { routes } from "./routes.tsx";

// GitHub PagesのURL（/keiri-note/）でも動くように設定を作成
const router = createBrowserRouter(routes, {
  basename: "/keiri-note",
});

export default function App() {
  return <RouterProvider router={router} />;
}
