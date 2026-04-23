import { RouterProvider } from "react-router";
// もし import { ... } from './routes' となっていたら
// 以下のように .tsx を明示的に付けるか、パスを確認します
import { routes } from './routes.tsx';

export default function App() {
  return <RouterProvider router={router} />;
}
