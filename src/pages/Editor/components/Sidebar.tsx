import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.div`
  border-right: 1px solid grey;
  height: 100%;
  width: 48px;
  padding: 8px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 16px;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <StyledLink to="/editor">Editor</StyledLink>
      <StyledLink to="/editor/actions">Action</StyledLink>
    </StyledSidebar>
  );
}
