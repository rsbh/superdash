import styled from "styled-components";
import { blackA } from "@radix-ui/colors";

export const Table = styled.table`
  border: 2px solid ${blackA.blackA12};
  border-spacing: 0px;
`;

export const THead = styled.thead``;

export const Th = styled.th`
  padding: 8px;
  border: 1px solid ${blackA.blackA12};
  text-align: left;
`;

export const Td = styled.td`
  padding: 8px;
  border: 1px solid ${blackA.blackA12};
  text-align: left;
`;

export const Tbody = styled.tbody``;
export const Tr = styled.tr`
  border-bottom: 1px solid;
`;
