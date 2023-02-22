import styled from "styled-components";

const StyledContainer = styled.main`
  width: 100%;
`;
export default function Container({ children }: any) {
  return <StyledContainer>{children}</StyledContainer>;
}
