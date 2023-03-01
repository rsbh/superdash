import Button from "@/components/Button";
import Input from "@/components/Input";
import { Table, THead, Tr, Th, Tbody, Td } from "@/components/Table";
import { ValuesMap } from "@/types/page";
import {
  TableColumn,
  TableColumnTypes,
  TableColumnTypesMap,
} from "@/types/table";
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

interface TableCellProps {
  data: any;
  colType: TableColumnTypes;
}

function TableCell({ colType, data }: TableCellProps) {
  switch (colType) {
    case TableColumnTypesMap.BUTTON:
      return <Button>Button</Button>;
    case TableColumnTypesMap.INPUT:
      return <Input />;
    default:
      return <>{data}</>;
  }
}

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

  const rows = useMemo(() => {
    return tableData.data.map((dataObj) => {
      return columns.map(
        (col: TableColumn) =>
          (col.key && { data: dataObj[col.key], type: col.type }) || {
            data: "",
            type: col.type,
          }
      );
    });
  }, [columns, tableData.data]);

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
            {columns.map((h: any, i: number) => (
              <Th key={`${h.label}-i`}>{h.label}</Th>
            ))}
          </Tr>
        </THead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {row.map((col, j) => (
                <Td key={`${i}-${j}`}>
                  <TableCell data={col.data} colType={col.type} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
}
