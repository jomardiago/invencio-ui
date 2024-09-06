import { Edit, Product, TrashCan } from "@carbon/icons-react";
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
import {
  Product as ProductType,
  useProductsQuery,
} from "../../apis/useProductsQuery";
import { formatToCurrency } from "../../../../common/utils/formatToCurrency";
import SideRail from "../../../../common/components/sideRail/SideRail";
import ProductForm from "../productForm/ProductForm";
import { useState } from "react";
import { format } from "date-fns";
import { useDeleteProductMutation } from "../../apis/useDeleteProductMutation";

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
  const deleteProduct = useDeleteProductMutation(session?.id);
  const [isCreateProductFormOpen, setIsCreateProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [delProductConfig, setDelProductConfig] = useState<{
    data: ProductType | undefined;
    isOpen: boolean;
  }>({ data: undefined, isOpen: false });

  const onEditProduct = (id: string) => {
    if (products.data) {
      const product = products.data.find((d) => d.id === Number(id));
      setSelectedProduct(product);
      setIsCreateProductFormOpen(true);
    }
  };

  const onDeleteProduct = (id: string) => {
    if (products.data) {
      const product = products.data.find((d) => d.id === Number(id));
      setDelProductConfig({
        data: product!,
        isOpen: true,
      });
    }
  };

  const onDeleteProductHandler = () => {
    if (delProductConfig.data?.id) {
      deleteProduct.mutate(delProductConfig.data.id, {
        onSettled: () =>
          setDelProductConfig({ data: undefined, isOpen: false }),
      });
    }
  };

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
      <Loading active={products.isLoading || deleteProduct.isPending} />

      {deleteProduct.error && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title="Delete Product Failed:"
            subtitle={deleteProduct.error.message}
            lowContrast
          />
        </div>
      )}

      {deleteProduct.isSuccess && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="success"
            title="Delete Product Success:"
            subtitle={deleteProduct.data?.message}
            lowContrast
          />
        </div>
      )}

      <SideRail
        isOpen={isCreateProductFormOpen}
        onCloseHandler={() => setIsCreateProductFormOpen(false)}
        title="Create Product"
      >
        <ProductForm key={selectedProduct?.id} product={selectedProduct} />
      </SideRail>

      <Modal
        open={delProductConfig.isOpen}
        onRequestClose={() =>
          setDelProductConfig({ isOpen: false, data: undefined })
        }
        modalHeading={`Are you sure you want to delete ${delProductConfig.data?.title}? It will delete the record in the database permanently.`}
        modalLabel="Product"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onDeleteProductHandler}
        danger
      />

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
                                onClick={() => onEditProduct(row.id)}
                                hasIconOnly
                              />
                              {session?.isAdmin && (
                                <Button
                                  renderIcon={TrashCan}
                                  iconDescription="Delete Product"
                                  tooltipPosition="left"
                                  kind="danger"
                                  onClick={() => onDeleteProduct(row.id)}
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

export default ProductsTable;
