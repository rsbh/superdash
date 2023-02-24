import styled from "styled-components";
import { AiOutlineApi } from "react-icons/ai";

const NewActionsListWrapper = styled.div`
  padding: 16px;
`;

const NewActionsButton = styled.button`
  width: 64px;
  height: 64px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NewActionButtonIcon = styled.div`
  font-size: 24px;
`;
const NewActionButtonName = styled.div`
  font-size: 12px;
`;
const actionsList = [
  {
    name: "Rest API",
    id: "REST_API",
    icon: <AiOutlineApi />,
  },
];

interface NewActionsListProps {
  onClick: (id: string) => void;
}

export default function NewActionsList({ onClick }: NewActionsListProps) {
  return (
    <NewActionsListWrapper>
      {actionsList.map((act) => (
        <NewActionsButton key={act.id} onClick={(e) => onClick(act.id)}>
          <NewActionButtonIcon>{act.icon}</NewActionButtonIcon>
          <NewActionButtonName>{act.name}</NewActionButtonName>
        </NewActionsButton>
      ))}
    </NewActionsListWrapper>
  );
}
