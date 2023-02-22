import { PageConfig, WidgetsMap } from "@/types/widget";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ActionsPage from "./pages/Actions";
import WidgetsEditor from "./pages/WidgetsEditor";

export default function EditorPage() {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    title: "",
    id: "",
    widgets: {},
    actions: [],
    widgetsCount: 0,
  });

  function updatePageWidgets(widgetsMap: WidgetsMap) {
    setPageConfig((prev) => ({ ...prev, widgets: widgetsMap }));
  }

  function increaseWidgetsCount() {
    const count = pageConfig.widgetsCount + 1;
    setPageConfig((prev) => ({
      ...prev,
      widgetsCount: count,
    }));
    return count;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <WidgetsEditor
              widgetsMap={pageConfig.widgets}
              updatePageWidgets={updatePageWidgets}
              increaseWidgetsCount={increaseWidgetsCount}
            />
          }
        />

        <Route path="/actions" element={<ActionsPage />} />
      </Route>
    </Routes>
  );
}
