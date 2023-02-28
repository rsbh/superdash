import { describe, expect, it } from "vitest";
import { resolveCustomVariables, runCustomCode } from "./index";

describe("resolveCustomVariables", () => {
  const testPageData = {
    widgets: {
      input1: {
        value: "foo bar",
      },
    },
    actions: {},
  };

  it("should replace the value from input widget", () => {
    const input = "https://example.com?query={{widgets.input1.value}}";
    const result = resolveCustomVariables(input, testPageData);
    expect(result).toEqual("https://example.com?query=foo bar");
  });
});

describe("runCustomCode", () => {
  const testPageData = {
    widgets: {},
    actions: {
      getUserList: {
        result: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    },
  };

  it("should map on the action data", () => {
    const input = "actions.getUserList.result.map(r => r.name)";
    const result = runCustomCode(input, testPageData);
    expect(result).toEqual(["User 1", "User 2"]);
  });

  it("should not delete data from store", () => {
    const input = "delete actions.getUserList";
    expect(() => runCustomCode(input, testPageData)).toThrowError(
      "Cannot delete property 'getUserList'"
    );
  });
});
