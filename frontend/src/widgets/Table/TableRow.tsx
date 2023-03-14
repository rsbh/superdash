import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Switch from "@/components/Switch";
import { Td, Tr } from "@/components/Table";
import {
  TableColumn,
  TableColumnTypes,
  TableColumnTypesMap,
} from "@/types/table";
import { useEffect, useState } from "react";

interface TableCellProps {
  col: TableColumn;
  id: string;
  onCellUpdate: (updateData: any) => void;
}

function TableCell({ col, id, onCellUpdate }: TableCellProps) {
  const { type, data } = col;
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    onCellUpdate({
      ...col,
      data: newValue,
    });
  }

  function onSwitchChange(newValue: boolean) {
    onCellUpdate({
      ...col,
      data: newValue,
    });
  }

  switch (type) {
    case TableColumnTypesMap.BUTTON:
      return <Button>Button</Button>;
    case TableColumnTypesMap.INPUT:
      return <Input id={id} value={data} onChange={onInputChange} />;
    case TableColumnTypesMap.SWITCH:
      return (
        <Switch
          id={id}
          defaultValue={Boolean(data)}
          onChange={onSwitchChange}
        />
      );
    case TableColumnTypesMap.CHECKBOX:
      return (
        <Checkbox
          id={id}
          defaultValue={Boolean(data)}
          onChange={onSwitchChange}
        />
      );
    case TableColumnTypesMap.SELECT:
      return <Select id={id} options={[]} />;
    default:
      return <>{data}</>;
  }
}

interface TableRowProps {
  row: Array<TableColumn>;
  selectRow: (rowData: Array<TableColumn>) => void;
}

export function TableRow({ selectRow, row }: TableRowProps) {
  const [rowData, setRowData] = useState(row);

  useEffect(() => {
    setRowData(row);
  }, [row]);

  function handleClick() {
    selectRow(rowData);
  }

  function onCellUpdate(updatedCell: TableColumn) {
    const updatedRow = rowData.map((cell) => {
      return cell.key === updatedCell.key && cell.label === updatedCell.label
        ? updatedCell
        : cell;
    });
    setRowData(updatedRow);
    selectRow(updatedRow);
  }

  return (
    <Tr onClick={handleClick}>
      {rowData.map((col, j) => {
        const key = `table-${j}-${col.key}`;
        return (
          <Td key={key}>
            <TableCell col={col} id={key} onCellUpdate={onCellUpdate} />
          </Td>
        );
      })}
    </Tr>
  );
}
