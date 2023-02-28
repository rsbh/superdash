import { ActionsMap, WidgetsMap } from "./widget";

export interface PageConfig {
  title: string;
  id: string;
  widgets: WidgetsMap;
  actions: ActionsMap;
  widgetsCount: number;
}

export type ValuesMap = Record<string, any>;
