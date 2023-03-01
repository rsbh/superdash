import { PageConfig, ValuesMap } from "@/types/page";
import { WidgetComponent } from "@/types/widget";
import { executeEvents } from "@/utils/events";
import { useMemo, useState } from "react";
import { WidgetFactory } from "@/widgets/Widgetsfactory";

interface PreviewProps {
  pageConfig: PageConfig;
}

export default function Preview({ pageConfig }: PreviewProps) {
  const [widgetsValuesMap, setWidgetsValuesMap] = useState<ValuesMap>({});
  const [actionsValuesMap, setActionsValuesMap] = useState<ValuesMap>({});

  const widgetsMap = useMemo(() => pageConfig.widgets, [pageConfig.widgets]);
  function updateWidgetsData(
    name: string,
    value: any,
    keyName: string = "value"
  ) {
    setWidgetsValuesMap((prev) => ({
      ...prev,
      [name]: {
        ...prev.name,
        [keyName]: value,
      },
    }));
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
            widget={wc}
            updateWidgetsData={updateWidgetsData}
            handleWidgetEvent={handleWidgetEvent}
            actionsValuesMap={actionsValuesMap}
          ></WidgetFactory>
        );
      })}
    </div>
  );
}
