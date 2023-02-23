import { REST_METHODS_MAP } from "@/types/actions";
import { Map } from "immutable";
import { useMemo, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";

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

const regex =
  /{{\w+-?\d*.\w+##[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}}}/g;

interface RestActionFormProps {
  widgetsVariables: Array<{ id: string; display: string }>;
  widgetsValuesMap: Map<string, any>;
}

export default function RestActionForm({
  widgetsVariables,
  widgetsValuesMap,
}: RestActionFormProps) {
  const [text, setText] = useState("");

  function handleChange(e: { target: { value: string } }) {
    setText(e.target.value);
  }

  function onClick() {
    let newText = text;
    const variables = text.match(regex);
    variables?.forEach((v) => {
      const [_, id] = v.replaceAll(/{{|}}/gi, "").split("##");
      if (widgetsValuesMap.has(id)) {
        newText = newText.replaceAll(v, widgetsValuesMap.get(id));
      }
    });
    console.log(newText);
  }

  return (
    <div style={{ padding: "16px" }}>
      <select>
        {methods.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
      <MentionsInput
        value={text}
        onChange={handleChange}
        style={{ width: "200px" }}
      >
        <Mention
          trigger="{{"
          displayTransform={(id, display) => `{{${display}}}`}
          data={widgetsVariables}
          markup="{{__display__##__id__}}"
        />
      </MentionsInput>
      <button onClick={onClick}>Go</button>
    </div>
  );
}
