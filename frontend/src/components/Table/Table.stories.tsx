import theme from "@/config/theme";
import { ThemeProvider } from "styled-components";
import { Table, TBody, Td, Th, THead, Tr } from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Table",
  component: Table,
};

export const Primary = () => (
  <ThemeProvider theme={theme}>
    <Table id="table">
      <THead>
        <Tr>
          <Th>Col 1</Th>
          <Th>Col 2</Th>
        </Tr>
      </THead>
      <TBody>
        <Tr>
          <Td>Data 1</Td>
          <Td>Data 2</Td>
        </Tr>
        <Tr>
          <Td>Data 1</Td>
          <Td>Data 2</Td>
        </Tr>
      </TBody>
    </Table>
  </ThemeProvider>
);
