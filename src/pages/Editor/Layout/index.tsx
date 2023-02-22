import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const StyledSection = styled.section`
  display: flex;
  height: 100%;
`;

const StyledLayout = styled.div`
  height: 100vh;
`;

export default function Layout() {
  return (
    <StyledLayout>
      <Header></Header>
      <StyledSection>
        <Sidebar></Sidebar>
        <Container>
          <Outlet />
        </Container>
      </StyledSection>
    </StyledLayout>
  );
}
