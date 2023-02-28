import { describe, expect, it } from "vitest";
import { resolveCustomVariables } from "./index";

describe("resolveCustomVariables", () => {
  const testPageData = {
    widgets: {
      input1: {
        value: "foo bar",
      },
    },
    actions: {
      getUserList: {
        result: [
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" },
        ],
      },
    },
  };

  it("should replace the value from input widget", () => {
    const input = "https://example.com?query={{widgets.input1.value}}";
    const result = resolveCustomVariables(input, testPageData);
    expect(result).toEqual("https://example.com?query=foo bar");
  });
});
