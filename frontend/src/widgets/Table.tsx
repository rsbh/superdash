import Button from "@/components/Button";
import Input from "@/components/Input";
import { Table, THead, Tr, Th, Tbody, Td } from "@/components/Table";
import { ValuesMap } from "@/types/page";
import { WidgetComponent } from "@/types/widget";
import {
  runCustomCode,
  trimCustomVariableRegex,
} from "@/utils/customVariables";
import { CSSProperties, useEffect, useMemo } from "react";
import styled from "styled-components";

interface TableWidgetProps {
  id: string;
  widget: WidgetComponent;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
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
  widget,
  handleWidgetEvent,
  actionsValuesMap,
  config,
  name,
  onWidgetUpdate,
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
      const result = runCustomCode(actionKey, {
        actions: actionsValuesMap,
        widgets: {},
      });

      const data = Array.isArray(result) ? result : [];

      const headings = Object.keys(data?.[0] || {})?.map((key) =>
        key.toUpperCase()
      );
      const rows = data.map((row) => Object.keys(row).map((col) => row[col]));

      return {
        headings,
        rows,
      };
    } catch (err) {
      return {
        headings: [],
        rows: [],
      };
    }
  }, [actionsValuesMap, config["data"]]);

  useEffect(() => {
    if (
      (!config["columns"] || config["columns"].length === 0) &&
      onWidgetUpdate
    ) {
      const columnsFromHeadings = tableData.headings.map((h) => ({
        label: h,
      }));
      onWidgetUpdate(id, {
        ...widget,
        config: {
          ...widget.config,
          columns: columnsFromHeadings,
        },
      });
    }
  }, [tableData.headings, config["columns"]]);

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
            {tableData.headings.map((h, i) => (
              <Th key={`${h}-i`}>{h}</Th>
            ))}
          </Tr>
        </THead>
        <Tbody>
          {tableData.rows.map((row, i) => (
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
