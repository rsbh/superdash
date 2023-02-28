import Button from "@/components/Button";
import Input from "@/components/Input";
import { Table, THead, Tr, Th, Tbody, Td } from "@/components/Table";
import { ValuesMap } from "@/types/page";
import {
  runCustomCode,
  trimCustomVariableRegex,
} from "@/utils/customVariables";
import { CSSProperties, useEffect, useMemo } from "react";
import styled from "styled-components";

interface TableWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
  actionsValuesMap: ValuesMap;
}

const TableWrapper = styled.div`
  border: 0.5px solid grey;
  padding: 8px;
`;

const TableTopBar = styled.div`
  display: flex;
  padding: 4px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export default function TableWidget({
  id,
  style,
  handleWidgetEvent,
  actionsValuesMap,
  config,
  name,
}: TableWidgetProps) {
  useEffect(() => {
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onLoad");
    }
  }, []);

  const tableData = useMemo(() => {
    try {
      const actionKey =
        trimCustomVariableRegex(config["data"]) || "actions.getUserData.result";
      const data = runCustomCode(actionKey, {
        actions: actionsValuesMap,
        widgets: {},
      });

      return Array.isArray(data) ? data : [];
    } catch (err) {
      return [];
    }
  }, [actionsValuesMap, config["data"]]);

  console.log(tableData, actionsValuesMap);
  const headings = Object.keys(tableData?.[0] || {})?.map((key) =>
    key.toUpperCase()
  );
  const rows = tableData.map((row) => Object.keys(row).map((col) => row[col]));

  return (
    <TableWrapper style={style}>
      <TableTopBar>
        <div>{name}</div>
        <div>
          <Input placeholder="Search" />
          <Button>Filter</Button>
        </div>
      </TableTopBar>
      <Table>
        <THead>
          <Tr>
            {headings.map((h, i) => (
              <Th key={`${h}-i`}>{h}</Th>
            ))}
          </Tr>
        </THead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {row.map((col, j) => (
                <Td key={`${i}-${j}`}>{col}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
}
