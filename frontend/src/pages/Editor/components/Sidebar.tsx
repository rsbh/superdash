import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  IconTools,
  IconDatabase,
  IconArrowsCross,
  IconSettings,
} from "@tabler/icons-react";

const StyledSidebar = styled.div`
  border-right: 1px solid grey;
  height: 100%;
  width: 64px;
  padding: 8px;
`;

const StyledLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  padding: 8px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.primary};
  border-radius: 10%;
  font-size: 20px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.white};
`;

const links = [
  {
    icon: <IconTools />,
    path: "/editor",
  },
  {
    icon: <IconArrowsCross />,
    path: "/editor/actions",
  },
  {
    icon: <IconDatabase />,
    path: "/editor/data-sources",
  },
  {
    icon: <IconSettings />,
    path: "/editor/settings",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <StyledSidebar>
      {links.map((l) => (
        <StyledLink
          to={l.path}
          key={l.path}
          isActive={l.path === location.pathname}
        >
          {l.icon}
        </StyledLink>
      ))}
    </StyledSidebar>
  );
}
