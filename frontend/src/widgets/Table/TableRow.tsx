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
      return <Input id={id} value={data} />;
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

interface TableRowProps {
  row: Array<TableColumn>;
  selectRow: (rowData: Array<TableColumn>) => void;
}

export function TableRow({ selectRow, row }: TableRowProps) {
  function handleClick() {
    selectRow(row);
  }

  return (
    <Tr onClick={handleClick}>
      {row.map((col, j) => {
        const key = `table-${j}`;
        return (
          <Td key={key}>
            <TableCell data={col.data} colType={col.type} id={key} />
          </Td>
        );
      })}
    </Tr>
  );
}
