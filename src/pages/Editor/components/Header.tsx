import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid grey;
  min-height: 48px;
  padding: 8px;
`;
export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
