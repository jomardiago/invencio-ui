import { Edit, Product, TrashCan } from "@carbon/icons-react";
import { Button, Loading, Modal, TableCell } from "@carbon/react";
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
import DataTable from "../../../../common/components/dataTable/DataTable";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";

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
  const { setToastNotification } = useToastNotificationStore();
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
        onSuccess: (data) => {
          setToastNotification({
            kind: "success",
            title: "Delete Product",
            subTitle: data.message,
          });
        },
        onError: (error) => {
          setToastNotification({
            kind: "error",
            title: "Delete Product",
            subTitle: error.message,
          });
        },
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

      <DataTable
        key="productsTable"
        data={buildProducts()}
        headers={headers}
        title={
          <div>
            <Product /> Products Management
          </div>
        }
        description="Manage all the products in your inventory."
        tableLabel="Products Table"
        addNewConfig={{
          onClick: () => setIsCreateProductFormOpen(true),
          buttonLabel: "Add New Product",
        }}
        renderRow={(rowId, cell) => {
          if (cell.id.includes("rowActions")) {
            return (
              <TableCell key={cell.id}>
                <div>
                  <Button
                    renderIcon={Edit}
                    iconDescription="Edit Product"
                    tooltipPosition="left"
                    kind="secondary"
                    onClick={() => onEditProduct(rowId)}
                    hasIconOnly
                  />
                  {session?.isAdmin && (
                    <Button
                      renderIcon={TrashCan}
                      iconDescription="Delete Product"
                      tooltipPosition="left"
                      kind="danger"
                      onClick={() => onDeleteProduct(rowId)}
                      hasIconOnly
                    />
                  )}
                </div>
              </TableCell>
            );
          }

          return <TableCell key={cell.id}>{cell.value}</TableCell>;
        }}
      />
    </div>
  );
}

export default ProductsTable;
