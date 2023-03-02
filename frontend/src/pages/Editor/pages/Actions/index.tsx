import { ActionsMap, WidgetsMap } from "@/types/widget";
import { useMemo, useState } from "react";
import styled from "styled-components";
import RestActionForm from "./components/RestActionForm";
import NewActionsList from "./components/NewActionsList";
import { ValuesMap } from "@/types/page";

interface ActionsPageProps {
  widgetsMap: WidgetsMap;
  actionMap: ActionsMap;
  widgetsValuesMap: ValuesMap;
  updatePageActions: (actionMap: ActionsMap) => void;
}

const ActionsPageWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ActionsList = styled.div`
  min-width: 240px;
  height: 100%;
  border-right: 0.5px solid grey;
`;

export default function ActionsPage({
  widgetsMap,
  widgetsValuesMap,
  updatePageActions,
  actionMap,
}: ActionsPageProps) {
  const [selectedAction, setSelectedAction] = useState("");

  const widgetsVariables = useMemo(() => {
    return Object.values(widgetsMap).map((w) => ({
      id: w.id,
      display: `${w.config["name"]}.value`,
    }));
  }, [widgetsMap]);

  function onNewActionButtonClick(actionId: string) {
    setSelectedAction(actionId);
  }

  function onCloseActionForm() {
    setSelectedAction("");
  }

  function getActionComponent(id: string) {
    switch (id) {
      case "REST_API": {
        return (
          <RestActionForm
            widgetsVariables={widgetsVariables}
            widgetsValuesMap={widgetsValuesMap}
            updatePageActions={updatePageActions}
            actionMap={actionMap}
            onClose={onCloseActionForm}
          />
        );
      }
      default: {
        return <NewActionsList onClick={onNewActionButtonClick} />;
      }
    }
  }

  return (
    <ActionsPageWrapper>
      <ActionsList>Actions List</ActionsList>
      {getActionComponent(selectedAction)}
    </ActionsPageWrapper>
  );
}
