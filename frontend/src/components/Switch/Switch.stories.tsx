import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Switch from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Switch",
  component: Switch,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Switch id="switch" />
  </ThemeProvider>
);
export const LeftLabel = () => (
  <ThemeProvider theme={theme}>
    <Switch id="switch" label="Label" />
  </ThemeProvider>
);
export const TopLabel = () => (
  <ThemeProvider theme={theme}>
    <Switch id="switch" label="Label" labelPostion="top" />
  </ThemeProvider>
);
