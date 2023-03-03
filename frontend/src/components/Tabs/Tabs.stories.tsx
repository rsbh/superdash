import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import Tabs from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Tabs",
  component: Tabs,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Tabs
      defaultValue="tab1"
      tabs={[
        { value: "tab1", label: "Tab 1", content: <div>Tab 1</div> },
        { value: "tab2", label: "Tab 2", content: <div>Tab 2</div> },
      ]}
    />
  </ThemeProvider>
);
