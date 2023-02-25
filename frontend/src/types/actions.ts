export const REST_METHODS_MAP = {
  GET: "GET",
  POST: "POST",
} as const;

export const WIDGET_ACTIONS_MAP = {
  REST_API: "REST_API",
} as const;

export type WIDGET_ACTIONS_TYPES = keyof typeof WIDGET_ACTIONS_MAP;
export type REST_API_METHODS = keyof typeof REST_METHODS_MAP;

interface COMMON_ACTION_CONFIG {
  id: string;
  name: string;
  type: WIDGET_ACTIONS_TYPES;
}

interface REST_API_ACTION extends COMMON_ACTION_CONFIG {
  method: REST_API_METHODS;
  url: string;
  params: Record<string, any>;
  headers: Record<string, any>;
  payload: string;
}

export type WIDGET_ACTION = REST_API_ACTION;
