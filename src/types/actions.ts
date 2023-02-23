export const REST_METHODS_MAP = {
  GET: "GET",
  POST: "POST",
} as const;

const WIDGET_ACTIONS_MAP = {
  REST_API: "REST_API",
} as const;

type WIDGET_ACTIONS_TYPES = keyof typeof WIDGET_ACTIONS_MAP;
type REST_API_METHODS = keyof typeof REST_METHODS_MAP;

interface REST_API_ACTION {
  type: WIDGET_ACTIONS_TYPES;
  method: REST_API_METHODS;
  url: string;
}

export type WIDGET_ACTION = REST_API_ACTION;
