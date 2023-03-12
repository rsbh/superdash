const VARIABLE_REGEX = /{{[\w\W]+}}/gi;

interface VariablesStore {
  actions?: Record<string, Record<string, any>>;
  widgets?: Record<string, Record<string, any>>;
  rowData?: Record<string, Record<string, any>>;
}

export function runCustomCode(
  code: string,
  { actions = {}, widgets = {}, rowData = {} }: VariablesStore
) {
  try {
    return JSON.parse(code);
  } catch (err) {
    return new Function(
      "widgets",
      "actions",
      "rowData",
      `'use strict'; 

    const deepFreeze = obj => {
      Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
      });
      return Object.freeze(obj);
    };

      deepFreeze(widgets);
      deepFreeze(rowData);
      deepFreeze(actions);
      return ${code}`
    )(widgets, actions, rowData);
  }
}

export function trimCustomVariableRegex(str: string) {
  return str.replaceAll(/{{|}}/g, "");
}

export function resolveCustomVariables(data: string, store: VariablesStore) {
  const variables = data.match(VARIABLE_REGEX);
  let dataWithValues = data;
  variables?.forEach((v) => {
    const fnBodyStr = trimCustomVariableRegex(v);
    const result = runCustomCode(fnBodyStr, store);
    dataWithValues = dataWithValues.replaceAll(v, result);
  });

  return dataWithValues;
}
