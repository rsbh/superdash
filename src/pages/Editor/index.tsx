import {
  ActionsMap,
  PageConfig,
  WidgetEventKeys,
  WidgetsMap,
  WidgetsValueMap,
} from "@/types/widget";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ActionsPage from "./pages/Actions";
import WidgetsEditor from "./pages/WidgetsEditor";
import { Map } from "immutable";
import { executeEvents } from "@/utils/events";

export default function EditorPage() {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    title: "",
    id: "",
    widgets: {},
    actions: {},
    widgetsCount: 0,
  });

  const [widgetsValuesMap, setWidgetsValuesMap] = useState<WidgetsValueMap>(
    Map<string, any>()
  );

  function updatePageWidgets(widgetsMap: WidgetsMap) {
    setPageConfig((prev) => ({ ...prev, widgets: widgetsMap }));
  }

  function updatePageActions(actionMap: ActionsMap) {
    setPageConfig((prev) => ({ ...prev, actions: actionMap }));
  }

  function updateWidgetsValue(id: string, value: any) {
    setWidgetsValuesMap((prev) => prev.set(id, value));
  }

  function increaseWidgetsCount() {
    const count = pageConfig.widgetsCount + 1;
    setPageConfig((prev) => ({
      ...prev,
      widgetsCount: count,
    }));
    return count;
  }

  function handleWidgetEvent(widgetId: string, eventKey: WidgetEventKeys) {
    executeEvents({
      widgetId,
      eventKey,
      pageConfig,
      widgetsValuesMap,
    });
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <WidgetsEditor
              widgetsMap={pageConfig.widgets}
              actionMap={pageConfig.actions}
              updatePageWidgets={updatePageWidgets}
              increaseWidgetsCount={increaseWidgetsCount}
              updateWidgetsValue={updateWidgetsValue}
            />
          }
        />

        <Route
          path="/actions"
          element={
            <ActionsPage
              widgetsMap={pageConfig.widgets}
              actionMap={pageConfig.actions}
              widgetsValuesMap={widgetsValuesMap}
              updatePageActions={updatePageActions}
            />
          }
        />
      </Route>
    </Routes>
  );
}
