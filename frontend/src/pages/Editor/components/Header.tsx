import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid grey;
  min-height: 48px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;
export default function Header() {
  return (
    <StyledHeader>
      <div>Logo</div>
      <Link to="/editor/preview">Preview</Link>
    </StyledHeader>
  );
}
