import { Product } from "@carbon/icons-react";
import CountWidget from "../countWidget/CountWidget";
import { InlineLoading } from "@carbon/react";
import useSessionStore from "../../../../stores/sessionStore";
import { useProductsCountQuery } from "../../apis/useProductsCountQuery";

function ProductsCountWidget() {
  const { session } = useSessionStore();
  const productsCount = useProductsCountQuery(session?.id);

  return (
    <CountWidget
      renderIcon={() => <Product size={32} style={{ color: "white" }} />}
      value={
        productsCount.isLoading ? <InlineLoading /> : productsCount.data || 0
      }
      label="Products"
      iconBgColor="cyan"
      flex={1}
    />
  );
}

export default ProductsCountWidget;
