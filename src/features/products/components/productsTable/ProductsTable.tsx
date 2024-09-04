import { Product } from "@carbon/icons-react";
import {
  Button,
  DataTable,
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

const rows = [
  {
    id: "1",
    title: "Samsung Galaxy S24 Duplicate",
    stock: 20,
    buyingPrice: "55000",
    sellingPrice: "58999.99",
    createdAt: "2024-09-04T02:13:46.152Z",
    categoryId: 1,
  },
];

const headers = [
  {
    key: "title",
    header: "Name",
  },
  {
    key: "stock",
    header: "Stock",
  },
  {
    key: "buyingPrice",
    header: "Buying Price",
  },
  {
    key: "sellingPrice",
    header: "Selling Price",
  },
  {
    key: "categoryId",
    header: "Category",
  },
  {
    key: "createdAt",
    header: "Date Added",
  },
];

function ProductsTable() {
  return (
    <DataTable rows={rows} headers={headers}>
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
          title={
            <div>
              <Product /> Products Management
            </div>
          }
          description="Manage all the products in your inventory."
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
              <Button onClick={() => {}}>Add New Product</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="Products Table">
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
                    return <TableCell key={cell.id}>{cell.value}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

export default ProductsTable;
