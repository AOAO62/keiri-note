import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { TopPage } from "./pages/TopPage";
import { StepsPage } from "./pages/StepsPage";
import { ExpenseDictionaryPage } from "./pages/ExpenseDictionaryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: TopPage },
      { path: "steps", Component: StepsPage },
      { path: "dictionary", Component: ExpenseDictionaryPage },
    ],
  },
]);
