import { WidgetsMap } from "@/types/widget";
import { useMemo, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import RestActionForm from "./components/RestActionForm";
interface ActionsPageProps {
  widgetsMap: WidgetsMap;
}

export default function ActionsPage({ widgetsMap }: ActionsPageProps) {
  const widgetsVariables = useMemo(() => {
    return Object.values(widgetsMap).map((w) => ({
      id: w.id,
      display: `${w.config["name"]}.value`,
    }));
  }, [widgetsMap]);

  return (
    <div>
      <RestActionForm widgetsVariables={widgetsVariables} />
    </div>
  );
}
