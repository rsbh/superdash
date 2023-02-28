import styled from "styled-components";
import { grayA } from "@radix-ui/colors";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow: "scroll";
`;

export const THead = styled.thead``;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  border: 1px solid ${grayA.grayA5};
`;

export const Td = styled.td`
  padding: 8px;
  border: 1px solid ${grayA.grayA5};
  text-align: left;
`;

export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
