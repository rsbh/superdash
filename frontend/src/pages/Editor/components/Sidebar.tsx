import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { GrAction } from "react-icons/gr";

const StyledSidebar = styled.div`
  border-right: 1px solid grey;
  height: 100%;
  width: 48px;
  padding: 8px;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border: 0.5px solid grey;
  border-radius: 10%;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <StyledLink to="/editor">
        <FaEdit />
      </StyledLink>
      <StyledLink to="/editor/actions">
        <GrAction />
      </StyledLink>
    </StyledSidebar>
  );
}
