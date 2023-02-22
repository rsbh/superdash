import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ActionsPage from "./pages/Actions";
import WidgetsEditor from "./pages/WidgetsEditor";

export default function EditorPage() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WidgetsEditor />} />
        <Route path="/actions" element={<ActionsPage />} />
      </Route>
    </Routes>
  );
}
