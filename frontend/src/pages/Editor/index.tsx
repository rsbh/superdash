import { ActionsMap, WidgetsMap } from "@/types/widget";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ActionsPage from "./pages/Actions";
import WidgetsEditor from "./pages/WidgetsEditor";
import { executeEvents } from "@/utils/events";
import { PageConfig, ValuesMap } from "@/types/page";
import Preview from "./pages/Preview";

const testData = {
  getUserData: {
    result: [{ id: 1, name: "User 1" }],
  },
};

export default function EditorPage() {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    title: "",
    id: "",
    widgets: {},
    actions: {},
    widgetsCount: 0,
  });

  const [widgetsValuesMap, setWidgetsValuesMap] = useState<ValuesMap>({});
  const [actionsValuesMap, setActionsValuesMap] = useState<ValuesMap>(testData);

  function updatePageWidgets(widgetsMap: WidgetsMap) {
    setPageConfig((prev) => ({ ...prev, widgets: widgetsMap }));
  }

  function updatePageActions(actionMap: ActionsMap) {
    setPageConfig((prev) => ({ ...prev, actions: actionMap }));
  }

  function updateWidgetsValue(id: string, value: any) {
    setWidgetsValuesMap((prev) => ({ ...prev, [id]: value }));
  }

  function increaseWidgetsCount() {
    const count = pageConfig.widgetsCount + 1;
    setPageConfig((prev) => ({
      ...prev,
      widgetsCount: count,
    }));
    return count;
  }

  async function handleWidgetEvent(widgetId: string, eventKey: string) {
    const results = await executeEvents({
      widgetId,
      eventKey,
      pageConfig,
      widgetsValuesMap,
    });
    setActionsValuesMap((prev) => {
      return results.reduce(
        (acc, res) => ({ ...acc, [res.actionName]: res.result }),
        prev
      );
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
              actionsValuesMap={actionsValuesMap}
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
        <Route path="/preview" element={<Preview pageConfig={pageConfig} />} />
      </Route>
    </Routes>
  );
}
