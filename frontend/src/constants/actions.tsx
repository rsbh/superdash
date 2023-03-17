const ACTION_TYPES = {
  NO_ACTION: "NO_ACTION",
  SHOW_ALERT: "SHOW_ALERT",
  NAVIGATE: "NAVIGATE",
} as const;

export type ActionTypes = keyof typeof ACTION_TYPES;

export interface BaseActionConfigObject {
  id: string;
  label: string;
  type: string;
  defaultValue: any;
}

interface ActionTemplate {
  title: string;
  config: Array<BaseActionConfigObject>;
}

export const ActionTemplateMap: Record<ActionTypes, ActionTemplate> = {
  NO_ACTION: {
    title: "No Action",
    config: [],
  },
  SHOW_ALERT: {
    title: "Show Alert",
    config: [
      {
        id: "message",
        label: "message",
        type: "string",
        defaultValue: "Alert",
      },
      {
        id: "type",
        label: "type",
        type: "alertType",
        defaultValue: "Info",
      },
    ],
  },
  NAVIGATE: {
    title: "Navigate",
    config: [
      {
        id: "url",
        label: "url",
        type: "string",
        defaultValue: "",
      },
      {
        id: "new_tab",
        label: "Open in New Tab",
        type: "Switch",
        defaultValue: false,
      },
    ],
  },
};
