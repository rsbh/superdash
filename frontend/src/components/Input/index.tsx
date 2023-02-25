import styled from "styled-components";
import { blackA } from "@radix-ui/colors";

const InputWrapper = styled.input`
  width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
  line-height: 1;
  color: white;
  background-color: ${blackA.blackA5};
  box-shadow: 0 0 0 1px ${blackA.blackA9};

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export default InputWrapper;
