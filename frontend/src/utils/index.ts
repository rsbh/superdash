export function boolToString(value: boolean) {
  return value === true ? "True" : "False";
}

export function stringToBool(value: string) {
  return value === "True" || value === "true";
}
