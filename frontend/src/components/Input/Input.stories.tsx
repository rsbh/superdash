import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Input from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Input",
  component: Input,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Input label="Label" />
  </ThemeProvider>
);
export const LabelTop = () => (
  <ThemeProvider theme={theme}>
    <Input label="Label" labelPostion="top" />
  </ThemeProvider>
);
export const LabelRight = () => (
  <ThemeProvider theme={theme}>
    <Input label="Label" labelPostion="right" />
  </ThemeProvider>
);
