import { PageConfig } from "@/types/page";
import { WidgetComponent } from "@/types/widget";
import { executeEvents } from "@/utils/events";
import { useMemo, useState } from "react";
import { WidgetFactory } from "@/widgets/Widgetsfactory";

interface PreviewProps {
  pageConfig: PageConfig;
}

export default function Preview({ pageConfig }: PreviewProps) {
  const [widgetsValuesMap, setWidgetsValuesMap] = useState<Record<string, any>>(
    {}
  );
  const [actionsValuesMap, setActionsValuesMap] = useState<Record<string, any>>(
    {}
  );

  const widgetsMap = useMemo(() => pageConfig.widgets, [pageConfig.widgets]);
  function updateWidgetsValue(id: string, value: any) {
    setWidgetsValuesMap((prev) => ({ ...prev, [id]: value }));
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
    <div>
      {Object.values(widgetsMap).map((wc: WidgetComponent, i: number) => {
        const { id, widgetType, styles, config, name } = wc;
        return (
          <WidgetFactory
            name={name}
            key={id}
            id={id}
            widgetType={widgetType}
            style={{ ...styles, position: "absolute" }}
            config={config}
            updateWidgetsValue={updateWidgetsValue}
            handleWidgetEvent={handleWidgetEvent}
            actionsValuesMap={actionsValuesMap}
          ></WidgetFactory>
        );
      })}
    </div>
  );
}
