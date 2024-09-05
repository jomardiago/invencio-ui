import {
  Button,
  DataTable,
  Loading,
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
import useSessionStore from "../../../../stores/sessionStore";
import { useSalesQuery } from "../../apis/useSalesQuery";
import { formatToCurrency } from "../../../../common/utils/formatToCurrency";
import { format } from "date-fns";
import { Edit, SalesOps, TrashCan } from "@carbon/icons-react";

const headers = [
  {
    key: "productTitle",
    header: "Product",
  },
  {
    key: "sellingPrice",
    header: "Selling Price",
  },
  {
    key: "quantity",
    header: "Quantity",
  },
  {
    key: "total",
    header: "Total",
  },
  {
    key: "createdAt",
    header: "Date Added",
  },
];

function SalesTable() {
  const { session } = useSessionStore();
  const sales = useSalesQuery(session?.id);

  const buildSales = () => {
    if (!sales.data) return [];

    return sales.data.map((sale) => ({
      ...sale,
      id: String(sale.id),
      productTitle: sale.product.title,
      sellingPrice: formatToCurrency(sale.sellingPrice),
      total: formatToCurrency(sale.total),
      createdAt: format(sale.createdAt, "PPPP"),
    }));
  };

  return (
    <div>
      <Loading active={sales.isLoading} />

      <DataTable rows={buildSales()} headers={headers}>
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
                <SalesOps /> Sales Management
              </div>
            }
            description="Manage all the sales in your inventory."
            {...getTableContainerProps()}
          >
            <TableToolbar
              {...getToolbarProps()}
              aria-label="data table toolbar"
            >
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button onClick={() => {}}>Add New Sale</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label="Sales Table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({ header })}
                      key={header.key}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })} key={row.id}>
                    {row.cells.map((cell) => {
                      if (cell.id.includes("rowActions")) {
                        return (
                          <TableCell key={cell.id}>
                            <div>
                              <Button
                                renderIcon={Edit}
                                iconDescription="Edit Sale"
                                tooltipPosition="left"
                                kind="secondary"
                                onClick={() => {}}
                                hasIconOnly
                              />
                              <Button
                                renderIcon={TrashCan}
                                iconDescription="Delete Sale"
                                tooltipPosition="left"
                                kind="danger"
                                onClick={() => {}}
                                hasIconOnly
                              />
                            </div>
                          </TableCell>
                        );
                      }

                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
}

export default SalesTable;
