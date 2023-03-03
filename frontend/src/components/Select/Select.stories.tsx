import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Select from "./index";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Select",
  component: Select,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Select
      placeholder="Select"
      label="Label"
      options={[
        { label: "Option1", value: "1" },
        { label: "Option2", value: "2" },
      ]}
    />
  </ThemeProvider>
);

export const LabelTop = () => (
  <ThemeProvider theme={theme}>
    <Select
      placeholder="Select"
      label="Label"
      options={[
        { label: "Option1", value: "1" },
        { label: "Option2", value: "2" },
      ]}
      labelPostion="top"
    />
  </ThemeProvider>
);
