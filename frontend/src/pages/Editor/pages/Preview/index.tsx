import { PageConfig } from "@/types/page";
import { WidgetComponent, WidgetsValueMap } from "@/types/widget";
import { executeEvents } from "@/utils/events";
import { Map } from "immutable";
import { useMemo, useState } from "react";
import { WidgetFactory } from "../WidgetsEditor/components/WidgetFactory";

interface PreviewProps {
  pageConfig: PageConfig;
}

export default function Preview({ pageConfig }: PreviewProps) {
  const [widgetsValuesMap, setWidgetsValuesMap] = useState<WidgetsValueMap>(
    Map<string, any>()
  );

  const widgetsMap = useMemo(() => pageConfig.widgets, [pageConfig.widgets]);
  function updateWidgetsValue(id: string, value: any) {
    setWidgetsValuesMap((prev) => prev.set(id, value));
  }

  function handleWidgetEvent(widgetId: string, eventKey: string) {
    executeEvents({
      widgetId,
      eventKey,
      pageConfig,
      widgetsValuesMap,
    });
  }
  return (
    <div>
      {Object.values(widgetsMap).map((wc: WidgetComponent, i: number) => {
        const { id, widgetType, styles, config } = wc;
        return (
          <WidgetFactory
            key={id}
            id={id}
            widgetType={widgetType}
            style={{ ...styles, position: "absolute" }}
            config={config}
            updateWidgetsValue={updateWidgetsValue}
            handleWidgetEvent={handleWidgetEvent}
          ></WidgetFactory>
        );
      })}
    </div>
  );
}
