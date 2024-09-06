import { useState } from "react";
import {
  Button,
  DataTable,
  InlineNotification,
  Loading,
  Modal,
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
import { Sale, useSalesQuery } from "../../apis/useSalesQuery";
import { formatToCurrency } from "../../../../common/utils/formatToCurrency";
import { format } from "date-fns";
import { Edit, SalesOps, TrashCan } from "@carbon/icons-react";
import SideRail from "../../../../common/components/sideRail/SideRail";
import SaleForm from "../saleForm/SaleForm";
import { useDeleteSaleMutation } from "../../apis/useDeleteSaleMutation";

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
  {
    key: "rowActions",
    header: "",
  },
];

function SalesTable() {
  const { session } = useSessionStore();
  const sales = useSalesQuery(session?.id);
  const deleteSale = useDeleteSaleMutation(session?.id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale>();
  const [deleteConfig, setDeleteConfig] = useState<{
    data: Sale | undefined;
    isOpen: boolean;
  }>({ data: undefined, isOpen: false });

  const editSale = (saleId: string) => {
    const sale = sales.data?.find((d) => d.id === Number(saleId));

    if (sale) {
      setSelectedSale(sale);
      setIsFormOpen(true);
    }
  };

  const confirmDeleteSale = (saleId: string) => {
    const sale = sales.data?.find((d) => d.id === Number(saleId));

    if (sale) {
      setDeleteConfig({
        data: sale,
        isOpen: true,
      });
    }
  };

  const addSale = () => {
    setIsFormOpen(true);
    setSelectedSale(undefined);
  };

  const onDeleteSale = () => {
    deleteSale.mutate(Number(deleteConfig.data?.id), {
      onSettled: () => setDeleteConfig({ data: undefined, isOpen: false }),
    });
  };

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
      <Loading active={sales.isLoading || deleteSale.isPending} />

      {deleteSale.isError && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title="Delete Sale Failed:"
            subtitle={deleteSale.error?.message}
            lowContrast
          />
        </div>
      )}

      {deleteSale.isSuccess && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="success"
            title="Delete Sale Success:"
            subtitle={deleteSale.data?.message}
            lowContrast
          />
        </div>
      )}

      <SideRail
        isOpen={isFormOpen}
        onCloseHandler={() => setIsFormOpen(false)}
        title="Sale Form"
      >
        <SaleForm key={selectedSale?.id} sale={selectedSale} />
      </SideRail>

      <Modal
        open={deleteConfig.isOpen}
        onRequestClose={() =>
          setDeleteConfig({ isOpen: false, data: undefined })
        }
        modalHeading={`Are you sure you want to delete sale for ${deleteConfig.data?.product.title}? It will delete the record in the database permanently.`}
        modalLabel="Sale"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onDeleteSale}
        danger
      />

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
                <Button onClick={addSale}>Add New Sale</Button>
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
                                onClick={() => editSale(row.id)}
                                hasIconOnly
                              />
                              {session?.isAdmin && (
                                <Button
                                  renderIcon={TrashCan}
                                  iconDescription="Delete Sale"
                                  tooltipPosition="left"
                                  kind="danger"
                                  onClick={() => confirmDeleteSale(row.id)}
                                  hasIconOnly
                                />
                              )}
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
