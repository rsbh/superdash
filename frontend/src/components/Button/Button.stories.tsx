import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Button from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Button>Button</Button>
  </ThemeProvider>
);
export const Secondary = () => (
  <ThemeProvider theme={theme}>
    <Button type="secondary">Button</Button>
  </ThemeProvider>
);
