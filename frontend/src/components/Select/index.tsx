import { blackA, whiteA } from "@radix-ui/colors";
import * as RadixSelect from "@radix-ui/react-select";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import styled from "styled-components";

import * as Label from "@radix-ui/react-label";
type LabelPosition = "left" | "top";

interface SelectProps {
  id?: string;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
  labelPostion?: LabelPosition;
  label?: string;
}

const StyledLabel = styled(Label.Root)<{ labelPostion?: LabelPosition }>`
  font-size: 16;
  font-weight: 600;
  margin-right: ${({ labelPostion }) => (labelPostion === "left" ? "16px" : 0)};
  margin-bottom: ${({ labelPostion }) => (labelPostion === "left" ? 0 : "8px")};
`;

const SelectTrigger = styled(RadixSelect.Trigger)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px 16px;
  height: 35px;
  font-size: 16px;
  line-height: 1;
  gap: 4px;
  cursor: pointer;
  background: ${whiteA.whiteA1};
  border: 2px solid ${blackA.blackA12};
  color: "#FFF";
  min-width: 120px;

  svg {
    font-size: 18px;
  }
`;

const SelectContent = styled(RadixSelect.SelectContent)`
  background-color: white;
  overflow: hidden;
  border-radius: 4px;
  min-width: 120px;
  padding: 8px;
`;

const SelectViewport = styled(RadixSelect.Viewport)`
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SelectItem = styled(RadixSelect.Item)`
  padding: 12px 0;
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  outline: none;
  width: 100%;
  cursor: pointer;

  &[data-highlighted] {
    outline: none;
    background-color: ${blackA.blackA6};
  }
`;

const SelectWrapper = styled.div<{ labelPostion?: LabelPosition }>`
  display: flex;
  justify-content: center;
  align-items: ${({ labelPostion }) =>
    labelPostion === "left" ? "center" : "left"};
  width: fit-content;
  flex-direction: ${({ labelPostion }) =>
    labelPostion === "left" ? "row" : "column"};
`;

export default function Select({
  placeholder,
  options,
  labelPostion = "left",
  label,
  id,
}: SelectProps) {
  return (
    <SelectWrapper labelPostion={labelPostion}>
      {label ? (
        <StyledLabel htmlFor={id} labelPostion={labelPostion}>
          {label}
        </StyledLabel>
      ) : null}
      <RadixSelect.Root>
        <SelectTrigger>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <RxChevronDown />
          </RadixSelect.Icon>
        </SelectTrigger>

        <RadixSelect.Portal>
          <SelectContent>
            <SelectViewport>
              {options.map((o) => (
                <SelectItem value={o.value}>
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </SelectWrapper>
  );
}
