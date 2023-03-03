import styled from "styled-components";
import { rgba } from "polished";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow: "scroll";
`;

export const THead = styled.thead``;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  border: 0.5px solid ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  background-color: ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  color: ${({ theme }) => theme.colors.white};
`;

export const Td = styled.td`
  padding: 8px;
  border: 0.5px solid ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  text-align: left;
`;

export const TBody = styled.tbody``;
export const Tr = styled.tr``;
