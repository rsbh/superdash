import { WIDGET_ACTION } from "@/types/actions";
import { PageConfig, ValuesMap } from "@/types/page";
import { resolveCustomVariables } from "./customVariables";

interface executeEventsArgs {
  widgetId: string;
  eventKey: string;
  pageConfig: PageConfig;
  widgetsValuesMap: ValuesMap;
}

const VARIABLE_REGEX =
  /{{\w+-?\d*.\w+##[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}}}/g;

export async function executeEvents({
  pageConfig,
  widgetId,
  eventKey,
  widgetsValuesMap,
}: executeEventsArgs) {
  const { widgets, actions } = pageConfig;
  const widget = widgets[widgetId];
  const actionNames = widget.events[eventKey] as string[];
  return Promise.all(
    actionNames.map(async (actionName) => {
      if (actionName !== "none") {
        const action = actions[actionName];
        const result = await executeEvent({
          widgetsValuesMap,
          action,
        });
        return {
          actionName,
          result,
        };
      }
      return {
        actionName,
        result: "No Action",
      };
    })
  );
}

interface executeEventArgs {
  widgetsValuesMap: ValuesMap;
  action: WIDGET_ACTION;
}

export async function executeEvent({
  action,
  widgetsValuesMap,
}: executeEventArgs): Promise<any> {
  const { url, method } = action;
  const urlWithValues = resolveCustomVariables(url, {
    actions: {},
    widgets: {},
    rowData: {},
  });
  console.log(urlWithValues);
  return urlWithValues;
}
