import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Switch from "@/components/Switch";
import { Table, THead, Tr, Th, TBody, Td } from "@/components/Table";
import { ValuesMap } from "@/types/page";
import {
  TableColumn,
  TableColumnTypes,
  TableColumnTypesMap,
} from "@/types/table";
import { WidgetComponent } from "@/types/widget";
import {
  resolveCustomVariables,
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

interface TableCellProps {
  id: string;
  data: any;
  colType: TableColumnTypes;
}

function TableCell({ colType, data, id }: TableCellProps) {
  switch (colType) {
    case TableColumnTypesMap.BUTTON:
      return <Button>Button</Button>;
    case TableColumnTypesMap.INPUT:
      return <Input id={id} defaultValue={data} />;
    case TableColumnTypesMap.SWITCH:
      return <Switch id={id} defaultValue={Boolean(data)} />;
    case TableColumnTypesMap.CHECKBOX:
      return <Checkbox id={id} defaultValue={Boolean(data)} />;
    case TableColumnTypesMap.SELECT:
      return <Select id={id} options={[]} />;
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

  const rows = useMemo(() => {
    return tableData.data.map((rowData = {}) => {
      return columns.map((col: TableColumn) => {
        const data = col.data
          ? resolveCustomVariables(col.data, { rowData })
          : "";
        return { data, type: col.type };
      });
    });
  }, [columns, tableData.data]);

  function onRowClick(rowData: any) {
    return function () {
      updateWidgetsData(name, rowData, "selectedRow");
    };
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
            <Tr key={i} onClick={onRowClick(row)}>
              {row.map((col, j) => {
                const key = `table-${name}-${i}-${j}`;
                return (
                  <Td key={key}>
                    <TableCell data={col.data} colType={col.type} id={key} />
                  </Td>
                );
              })}
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableWrapper>
  );
}
