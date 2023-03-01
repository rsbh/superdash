import React, { useEffect, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { MdClose, MdSave } from "react-icons/md";
import Tabs from "@/components/Tabs";

import {
  REST_API_METHODS,
  REST_METHODS_MAP,
  WIDGET_ACTION,
  WIDGET_ACTIONS_MAP,
} from "@/types/actions";
import { ActionsMap } from "@/types/widget";
import { executeEvent } from "@/utils/events";
import Button from "@/components/Button";
import InputWrapper from "@/components/Input";
import { ValuesMap } from "@/types/page";

const methods = [
  {
    label: "POST",
    id: REST_METHODS_MAP.POST,
  },
  {
    label: "GET",
    id: REST_METHODS_MAP.GET,
  },
];

const RestActionFormHeader = styled.div`
  width: 100%;
  padding: 8px 16px;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
`;

const RestActionFormWrapper = styled.div`
  width: 100%;
`;

const RestActionFormBody = styled.div``;

const RestActionMethodURLWrapper = styled.div`
  display: flex;
  border-bottom: 0.5px solid grey;
  padding: 16px;
  select,
  input {
    height: 32px;
    font-size: 16px;
    width: 100px;
    margin-right: 16px;
  }
`;

const RestActionMethodContentWrapper = styled.div`
  display: flex;
  padding: 16px;
`;

const RestActionFormHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    font-size: 24px;
    border: 0px;
    box-shadow: none;
    cursor: pointer;
    margin: 0 8px;
  }
`;

const RunActionButton = styled(Button)`
  margin-left: 16px;
  width: 100px;
  cursor: pointer;
`;

const KeyValueTable = styled.table``;
const KeyValueTableHead = styled.th`
  display: flex;
`;
const KeyValueTableRow = styled.tr`
  display: flex;
`;

const KeyValueTableCol = styled.td`
  display: flex;
`;

interface RestActionFormProps {
  widgetsVariables: Array<{ id: string; display: string }>;
  widgetsValuesMap: ValuesMap;
  updatePageActions: (actionMap: ActionsMap) => void;
  actionMap: ActionsMap;
  onClose: () => void;
}

export default function RestActionForm({
  widgetsVariables,
  widgetsValuesMap,
  updatePageActions,
  actionMap,
  onClose,
}: RestActionFormProps) {
  const [actionName, setActionName] = useState("");
  const [userActionName, setUserActionName] = useState<string | null>(null);

  const [url, setURL] = useState("");
  const [method, setMethod] = useState<REST_API_METHODS>(methods[0].id);

  function onMethodChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as REST_API_METHODS;
    setMethod(value);
  }

  function handleChange(e: { target: { value: string } }) {
    const newURL = e.target.value;
    setURL(newURL);
  }

  useEffect(() => {
    const newName =
      userActionName !== null ? userActionName : `REST-${method}-${url}`;
    setActionName(newName);
  }, [method, url, userActionName]);

  function createNewAction() {
    const id = uuidv4();
    const action: WIDGET_ACTION = {
      id: id,
      name: actionName,
      type: WIDGET_ACTIONS_MAP.REST_API,
      method: method,
      url: url,
      params: {},
      headers: {},
      payload: "",
    };
    return action;
  }

  function onSaveAction() {
    const action = createNewAction();
    updatePageActions({
      ...actionMap,
      [action.id]: action,
    });
  }

  function onClick() {
    const action = createNewAction();
    executeEvent({ action, widgetsValuesMap });
  }

  function onUserActionNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserActionName(e.target.value);
  }

  const params = [...new Array(5)].map((_, i) => ({
    key: i,
    keyName: "",
    value: "",
  }));

  return (
    <RestActionFormWrapper>
      <RestActionFormHeader>
        <input value={actionName} onChange={onUserActionNameChange} />
        <RestActionFormHeaderActions>
          <Button onClick={onSaveAction}>
            <MdSave />
          </Button>
          <Button onClick={onClose}>
            <MdClose />
          </Button>
        </RestActionFormHeaderActions>
      </RestActionFormHeader>
      <RestActionFormBody>
        <RestActionMethodURLWrapper>
          <select onChange={onMethodChange} value={method}>
            {methods.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <MentionsInput
            value={url}
            onChange={handleChange}
            style={{ width: "600px" }}
            singleLine={true}
          >
            <Mention
              trigger={/({{(\w*))$/}
              displayTransform={(id, display) => `{{${display}}}`}
              data={widgetsVariables}
              markup="{{__display__##__id__}}"
            />
          </MentionsInput>
          <RunActionButton onClick={onClick}>Go</RunActionButton>
        </RestActionMethodURLWrapper>
        <RestActionMethodContentWrapper>
          <Tabs
            defaultValue="params"
            tabs={[
              {
                value: "params",
                label: "Params",
                content: (
                  <KeyValueTable>
                    <KeyValueTableHead>
                      <KeyValueTableRow>
                        <KeyValueTableCol width={"200px"}>Key</KeyValueTableCol>
                        <KeyValueTableCol>Value</KeyValueTableCol>
                      </KeyValueTableRow>
                    </KeyValueTableHead>
                    <tbody>
                      {params.map((p) => (
                        <KeyValueTableRow key={p.key}>
                          <KeyValueTableCol width={"200px"}>
                            <InputWrapper value={p.keyName} />
                          </KeyValueTableCol>
                          <KeyValueTableCol>
                            <InputWrapper value={p.value} />
                          </KeyValueTableCol>
                        </KeyValueTableRow>
                      ))}
                    </tbody>
                  </KeyValueTable>
                ),
              },
              {
                value: "headers",
                label: "Headers",
                content: (
                  <KeyValueTable>
                    <KeyValueTableHead>
                      <KeyValueTableRow>
                        <KeyValueTableCol width={"200px"}>Key</KeyValueTableCol>
                        <KeyValueTableCol>Value</KeyValueTableCol>
                      </KeyValueTableRow>
                    </KeyValueTableHead>
                    <tbody>
                      {params.map((p) => (
                        <KeyValueTableRow key={p.key}>
                          <KeyValueTableCol width={"200px"}>
                            <InputWrapper value={p.keyName} />
                          </KeyValueTableCol>
                          <KeyValueTableCol>
                            <InputWrapper value={p.value} />
                          </KeyValueTableCol>
                        </KeyValueTableRow>
                      ))}
                    </tbody>
                  </KeyValueTable>
                ),
              },
              {
                value: "body",
                label: "Body",
                content: <div>Body</div>,
              },
            ]}
          />
        </RestActionMethodContentWrapper>
      </RestActionFormBody>
    </RestActionFormWrapper>
  );
}
