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
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  font-weight: 600;
  cursor: pointer;

  &[data-state="active"] {
    background-color: ${blackA.blackA6};
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