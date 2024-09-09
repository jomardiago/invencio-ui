import {
  Button,
  DataTable as CarbonDataTable,
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from "@carbon/react";

type DataTableProps = {
  data: Array<{ id: string; [key: string]: unknown }>;
  headers: Array<{ key: string; header: string }>;
  title: string | React.ReactNode;
  tableLabel: string;
  description: string;
  addNewConfig: {
    onClick: () => void;
    buttonLabel: string;
  };
  renderRow?: (rowId: string, cell: DataTableCell<any>) => React.ReactNode;
};

function DataTable({
  data,
  headers,
  title,
  tableLabel,
  description,
  addNewConfig,
  renderRow,
}: DataTableProps) {
  return (
    <CarbonDataTable rows={data} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getTableContainerProps,
        onInputChange,
      }) => (
        <TableContainer
          title={title}
          description={description}
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
              <Button onClick={addNewConfig.onClick}>
                {addNewConfig.buttonLabel}
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label={tableLabel}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })} key={header.key}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => {
                    if (renderRow) {
                      return renderRow(row.id, cell);
                    } else {
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CarbonDataTable>
  );
}

export default DataTable;
