import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import PropertyField from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "PropertyField",
  component: PropertyField,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <PropertyField id="abcd" />
  </ThemeProvider>
);
