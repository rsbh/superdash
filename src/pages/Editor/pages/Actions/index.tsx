import { WidgetsMap } from "@/types/widget";
import { Map } from "immutable";
import { useMemo } from "react";
import RestActionForm from "./components/RestActionForm";

interface ActionsPageProps {
  widgetsMap: WidgetsMap;
  widgetsValuesMap: Map<string, any>;
}

export default function ActionsPage({
  widgetsMap,
  widgetsValuesMap,
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
      />
    </div>
  );
}
