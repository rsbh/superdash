import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Editor from "./pages/Editor";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "editor",
    element: <Editor />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
