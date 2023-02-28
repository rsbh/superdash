import { Table, THead, Tr, Th, Tbody, Td } from "@/components/Table";
import { CSSProperties, useEffect } from "react";

interface TableWidgetProps {
  data?: any[];
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function TableWidget({
  id,
  style,
  data = [],
  handleWidgetEvent,
}: TableWidgetProps) {
  const headings = Object.keys(data?.[0] || {})?.map((key) =>
    key.toUpperCase()
  );
  const rows = data.map((row) => Object.keys(row).map((col) => row[col]));

  useEffect(() => {
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onLoad");
    }
  }, []);
  return (
    <>
      <Table style={{ overflow: "scroll", tableLayout: "fixed", ...style }}>
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
                <Td key={`${i}-${j}`} style={{ overflow: "scroll" }}>
                  {col}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
