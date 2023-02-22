import { WidgetsMap } from "@/types/widget";
import { useMemo, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

interface ActionsPageProps {
  widgetsMap: WidgetsMap;
}

export default function ActionsPage({ widgetsMap }: ActionsPageProps) {
  const [text, setText] = useState("");

  function handleChange(e: { target: { value: string } }) {
    setText(e.target.value);
  }

  const widgetsVariables = useMemo(() => {
    return Object.values(widgetsMap).map((w) => ({
      id: w.id,
      display: `${w.config["name"]}.value`,
    }));
  }, [widgetsMap]);

  return (
    <div>
      <MentionsInput value={text} onChange={handleChange}>
        <Mention
          trigger="{{"
          displayTransform={(id, display) => `{{${display}}}`}
          data={widgetsVariables}
          markup="@[__display__](__id__)"
        />
      </MentionsInput>
    </div>
  );
}
