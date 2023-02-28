const VARIABLE_REGEX = /{{[\w\W]+}}/gi;

interface PageData {
  actions: Record<string, Record<string, any>>;
  widgets: Record<string, Record<string, any>>;
}

export function runCustomCode(code: string, { actions, widgets }: PageData) {
  return new Function(
    "widgets",
    "actions",
    `'use strict'; 

    const deepFreeze = obj => {
      Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
      });
      return Object.freeze(obj);
    };

      deepFreeze(widgets);
      deepFreeze(actions);
      return ${code}`
  )(widgets, actions);
}

export function resolveCustomVariables(data: string, pageData: PageData) {
  const variables = data.match(VARIABLE_REGEX);
  let dataWithValues = data;
  variables?.forEach((v) => {
    const fnBodyStr = v.replaceAll(/{{|}}/g, "");
    const result = runCustomCode(fnBodyStr, pageData);
    dataWithValues = dataWithValues.replaceAll(v, result);
  });

  return dataWithValues;
}
