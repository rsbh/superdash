import Button from "@/components/Button";
import Input from "@/components/Input";
import { Table, THead, Tr, Th, TBody } from "@/components/Table";
import { ValuesMap } from "@/types/page";
import { TableColumn, TableColumnTypesMap } from "@/types/table";
import { WidgetComponent } from "@/types/widget";
import {
  resolveCustomVariables,
  runCustomCode,
  trimCustomVariableRegex,
} from "@/utils/customVariables";
import { CSSProperties, useEffect, useMemo } from "react";
import styled from "styled-components";
import { TableRow } from "./TableRow";

interface TableWidgetProps {
  id: string;
  widget: WidgetComponent;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
  updateWidgetsData: (name: string, value: any, keyName?: string) => void;
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
  updateWidgetsData,
}: TableWidgetProps) {
  useEffect(() => {
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onLoad");
    }
  }, []);

  const tableData = useMemo(() => {
    try {
      const customCode = trimCustomVariableRegex(config["data"]);
      const result = runCustomCode(customCode, {
        actions: actionsValuesMap,
        widgets: {},
      });
      const data = Array.isArray(result) ? result : [];
      const keys = Object.keys(data?.[0] || {});
      return {
        keys,
        data,
      };
    } catch (err) {
      return {
        keys: [],
        data: [],
      };
    }
  }, [actionsValuesMap, config["data"]]);

  const columns = useMemo(() => {
    return config["columns"] as TableColumn[];
  }, [config["columns"]]);

  useEffect(() => {
    if ((!columns || columns.length === 0) && onWidgetUpdate) {
      const columnsFromHeadings: TableColumn[] = tableData.keys.map((key) => ({
        label: key.toUpperCase(),
        key,
        type: TableColumnTypesMap.TEXT,
        data: `{{rowData.${key}}}`,
      }));
      onWidgetUpdate(id, {
        ...widget,
        config: {
          ...widget.config,
          columns: columnsFromHeadings,
        },
      });
    }
  }, [tableData.keys, columns]);

  const rows: Array<Array<TableColumn>> = useMemo(() => {
    return tableData.data.map((rowData = {}) => {
      return columns.map((col: TableColumn) => {
        const data = col.data
          ? resolveCustomVariables(col.data, { rowData })
          : "";
        return { ...col, data };
      });
    });
  }, [columns, tableData.data]);

  function selectRow(rowData: Array<TableColumn>) {
    updateWidgetsData(name, rowData, "selectedRow");
  }

  return (
    <TableWrapper style={style}>
      <TableTopBar>
        <div>{name}</div>
        <div style={{ display: "flex" }}>
          <Input placeholder="Search" />
          <Button>Filter</Button>
        </div>
      </TableTopBar>
      <Table>
        <THead>
          <Tr>
            {columns.map((h: any, i: number) => (
              <Th key={`${h.label}-i`}>{h.label}</Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {rows.map((row, i) => (
            <TableRow key={i} row={row} selectRow={selectRow} />
          ))}
        </TBody>
      </Table>
    </TableWrapper>
  );
}
