import * as RadixSelect from "@radix-ui/react-select";
import { rgba } from "polished";
import { RxChevronDown } from "react-icons/rx";
import styled from "styled-components";
import Label, { LabelPosition } from "../Label";

interface SelectProps {
  id?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string; key?: string | number }>;
  labelPostion?: LabelPosition;
  label?: string;
  onChange?: (value: string) => void;
}

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
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: #000;
  min-width: 120px;

  svg {
    font-size: 18px;
  }
`;

const SelectContent = styled(RadixSelect.SelectContent)`
  background-color: ${({ theme }) => theme.colors.white};
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
  align-items: center;
  justify-content: center;
  outline: none;
  width: 100%;
  cursor: pointer;

  &[data-highlighted] {
    outline: none;
    background-color: ${({ theme }) => rgba(theme.colors.primary, 0.2)};
  }
`;

export default function Select({
  placeholder,
  options,
  labelPostion = "left",
  label,
  id,
  onChange,
}: SelectProps) {
  return (
    <Label label={label} htmlFor={id} position={labelPostion}>
      <RadixSelect.Root onValueChange={onChange}>
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
                <SelectItem value={o.value} key={o.key || o.value}>
                  <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Label>
  );
}
