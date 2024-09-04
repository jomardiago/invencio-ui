import { Edit, Product, TrashCan } from "@carbon/icons-react";
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
import { useProductsQuery } from "../../apis/useProductsQuery";
import { formatToCurrency } from "../../../../common/utils/formatToCurrency";
import SideRail from "../../../../common/components/sideRail/SideRail";
import ProductForm from "../productForm/ProductForm";
import { useState } from "react";
import { format } from "date-fns";

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
    key: "categoryName",
    header: "Category",
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

function ProductsTable() {
  const { session } = useSessionStore();
  const products = useProductsQuery(session?.id);
  const [isCreateProductFormOpen, setIsCreateProductFormOpen] = useState(false);

  const buildProducts = () => {
    if (!products.data) return [];

    return products.data.map((product) => ({
      ...product,
      id: String(product.id),
      buyingPrice: formatToCurrency(product.buyingPrice),
      sellingPrice: formatToCurrency(product.sellingPrice),
      categoryName: product.category.name,
      createdAt: format(product.createdAt, "PPPP"),
    }));
  };

  return (
    <div>
      <Loading active={products.isLoading} />

      <SideRail
        isOpen={isCreateProductFormOpen}
        onCloseHandler={() => setIsCreateProductFormOpen(false)}
        title="Create Product"
      >
        <ProductForm />
      </SideRail>

      <DataTable rows={buildProducts()} headers={headers}>
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
            <TableToolbar
              {...getToolbarProps()}
              aria-label="data table toolbar"
            >
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button onClick={() => setIsCreateProductFormOpen(true)}>
                  Add New Product
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label="Products Table">
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
                                iconDescription="Edit Product"
                                tooltipPosition="left"
                                kind="secondary"
                                onClick={() => {}}
                                hasIconOnly
                              />
                              <Button
                                renderIcon={TrashCan}
                                iconDescription="Delete Product"
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

export default ProductsTable;
