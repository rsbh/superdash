import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import { withRouter } from "storybook-addon-react-router-v6";

import Header from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Header",
  component: Header,
  decorators: [withRouter],
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Header />
  </ThemeProvider>
);
