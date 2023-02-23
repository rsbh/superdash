import { ActionsMap, WidgetsMap, WidgetsValueMap } from "@/types/widget";
import { useMemo } from "react";
import RestActionForm from "./components/RestActionForm";

interface ActionsPageProps {
  widgetsMap: WidgetsMap;
  actionMap: ActionsMap;
  widgetsValuesMap: WidgetsValueMap;
  updatePageActions: (actionMap: ActionsMap) => void;
}

export default function ActionsPage({
  widgetsMap,
  widgetsValuesMap,
  updatePageActions,
  actionMap,
}: ActionsPageProps) {
  const widgetsVariables = useMemo(() => {
    return Object.values(widgetsMap).map((w) => ({
      id: w.id,
      display: `${w.config["name"]}.value`,
    }));
  }, [widgetsMap]);

  return (
    <div>
      <RestActionForm
        widgetsVariables={widgetsVariables}
        widgetsValuesMap={widgetsValuesMap}
        updatePageActions={updatePageActions}
        actionMap={actionMap}
      />
    </div>
  );
}
