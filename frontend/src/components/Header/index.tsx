import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import * as Avatar from "@radix-ui/react-avatar";
import { blackA, violet } from "@radix-ui/colors";

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid grey;
  min-height: 48px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;

const AvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: ${blackA.blackA1};
  border: 2px solid ${violet.violet11};
`;

const AvatarFallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${violet.violet11};
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;

interface HeaderProps {
  previewLink?: string;
  showAvatar?: boolean;
}

export default function Header({ previewLink, showAvatar }: HeaderProps) {
  return (
    <StyledHeader>
      <div>Logo</div>
      {previewLink ? (
        <Link to="/editor/preview">
          <Button>Preview</Button>
        </Link>
      ) : null}
      {showAvatar ? (
        <AvatarRoot>
          <AvatarFallback>RM</AvatarFallback>
        </AvatarRoot>
      ) : null}
    </StyledHeader>
  );
}
