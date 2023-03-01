import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";
import styled from "styled-components";

const CollapsibleRoot = styled(RadixCollapsible.Root)`
  width: 300px;
  margin: 8px auto;
`;

const CollapsibleTrigger = styled(RadixCollapsible.Trigger)`
  width: 100%;
  padding: 8px;
`;

const CollapsibleContent = styled(RadixCollapsible.Content)`
  width: 100%;
  padding: 8px;
`;

interface CollapsibleProps {
  children: ReactNode;
  label: string;
}
export default function Collapsible({ children, label }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <CollapsibleRoot open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>{label}</CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
}
