import { blackA } from "@radix-ui/colors";
import * as RadixTabs from "@radix-ui/react-tabs";
import { ReactNode } from "react";
import styled from "styled-components";

const TabsRoot = styled(RadixTabs.Root)`
  display: flex;
  flex-direction: column;
`;
const TabsList = styled(RadixTabs.List)`
  display: flex;
`;

const TabsTrigger = styled(RadixTabs.Trigger)`
  all: unset;
  background-color: white;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  font-weight: regular;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  &[data-state="active"] {
    font-weight: bold;

    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
const TabsContent = styled(RadixTabs.Content)`
  padding: 16px;
`;

interface TabsProps {
  defaultValue: string;
  tabs: Array<{
    value: string;
    label: string;
    content: ReactNode;
  }>;
}

export default function Tabs({ defaultValue, tabs = [] }: TabsProps) {
  return (
    <TabsRoot defaultValue={defaultValue}>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger value={t.value} key={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent value={t.value} key={t.value}>
          {t.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
