import { WIDGET_ACTION } from "@/types/actions";
import { PageConfig } from "@/types/page";
import { WidgetEventKeys, WidgetsValueMap } from "@/types/widget";

interface executeEventsArgs {
  widgetId: string;
  eventKey: WidgetEventKeys;
  pageConfig: PageConfig;
  widgetsValuesMap: WidgetsValueMap;
}

const VARIABLE_REGEX =
  /{{\w+-?\d*.\w+##[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}}}/g;

export function executeEvents({
  pageConfig,
  widgetId,
  eventKey,
  widgetsValuesMap,
}: executeEventsArgs) {
  const { widgets, actions } = pageConfig;
  const widget = widgets[widgetId];
  // @ts-ignore
  const actionsIds = widget.events[eventKey] as string[];

  actionsIds.forEach(async (actionId) => {
    const action = actions[actionId];
    await executeEvent({
      widgetsValuesMap,
      action,
    });
  });
}

interface executeEventArgs {
  widgetsValuesMap: WidgetsValueMap;
  action: WIDGET_ACTION;
}

export async function executeEvent({
  action,
  widgetsValuesMap,
}: executeEventArgs) {
  const { url, method } = action;
  let urlWithValues = url;
  const variables = urlWithValues.match(VARIABLE_REGEX);
  variables?.forEach((v) => {
    const [_, id] = v.replaceAll(/{{|}}/gi, "").split("##");
    if (widgetsValuesMap.has(id)) {
      urlWithValues = urlWithValues.replaceAll(v, widgetsValuesMap.get(id));
    }
  });

  console.log(url, method);
}
