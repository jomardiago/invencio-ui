import { Product } from "@carbon/icons-react";
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
];

function ProductsTable() {
  const { session } = useSessionStore();
  const products = useProductsQuery(session?.id);

  const buildProducts = () => {
    if (!products.data) return [];

    return products.data.map((product) => ({
      ...product,
      id: String(product.id),
      buyingPrice: formatToCurrency(product.buyingPrice),
      sellingPrice: formatToCurrency(product.sellingPrice),
      categoryName: product.category.name,
    }));
  };

  return (
    <div>
      <Loading active={products.isLoading} />

      <SideRail isOpen={true} onCloseHandler={() => {}} title="Create Product">
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
                <Button onClick={() => {}}>Add New Product</Button>
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
