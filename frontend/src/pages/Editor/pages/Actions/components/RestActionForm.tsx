import {
  REST_API_METHODS,
  REST_METHODS_MAP,
  WIDGET_ACTION,
  WIDGET_ACTIONS_MAP,
} from "@/types/actions";
import { ActionsMap } from "@/types/widget";
import { executeEvent } from "@/utils/events";
import { Map } from "immutable";
import React, { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { v4 as uuidv4 } from "uuid";

const methods = [
  {
    label: "POST",
    id: REST_METHODS_MAP.POST,
  },
  {
    label: "GET",
    id: REST_METHODS_MAP.GET,
  },
];

interface RestActionFormProps {
  widgetsVariables: Array<{ id: string; display: string }>;
  widgetsValuesMap: Map<string, any>;
  updatePageActions: (actionMap: ActionsMap) => void;
  actionMap: ActionsMap;
}

export default function RestActionForm({
  widgetsVariables,
  widgetsValuesMap,
  updatePageActions,
  actionMap,
}: RestActionFormProps) {
  const [text, setText] = useState("");
  const [method, setMethod] = useState<REST_API_METHODS>(methods[0].id);

  function onMethodChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as REST_API_METHODS;
    setMethod(value);
  }

  function handleChange(e: { target: { value: string } }) {
    setText(e.target.value);
  }

  function createNewAction() {
    const id = uuidv4();
    const action: WIDGET_ACTION = {
      id: id,
      name: `REST-${method}-${text}`,
      type: WIDGET_ACTIONS_MAP.REST_API,
      method: method,
      url: text,
    };
    return action;
  }

  function onSaveAction() {
    const action = createNewAction();
    updatePageActions({
      ...actionMap,
      [action.id]: action,
    });
  }

  function onClick() {
    const action = createNewAction();
    executeEvent({ action, widgetsValuesMap });
  }

  return (
    <div style={{ padding: "16px" }}>
      <select onChange={onMethodChange} value={method}>
        {methods.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
      <MentionsInput
        value={text}
        onChange={handleChange}
        style={{ width: "400px" }}
        singleLine={true}
      >
        <Mention
          trigger={/({{(\w*))$/}
          displayTransform={(id, display) => `{{${display}}}`}
          data={widgetsVariables}
          markup="{{__display__##__id__}}"
        />
      </MentionsInput>
      <button onClick={onClick}>Go</button>
      <button onClick={onSaveAction}>Save</button>
    </div>
  );
}