import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Checkbox from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Checkbox",
  component: Checkbox,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Checkbox />
  </ThemeProvider>
);
export const LabelLeft = () => (
  <ThemeProvider theme={theme}>
    <Checkbox label="Label" />
  </ThemeProvider>
);
export const LabelTop = () => (
  <ThemeProvider theme={theme}>
    <Checkbox label="Label" labelPosition="top" />
  </ThemeProvider>
);
export const LabelRight = () => (
  <ThemeProvider theme={theme}>
    <Checkbox label="Label" labelPosition="right" />
  </ThemeProvider>
);
