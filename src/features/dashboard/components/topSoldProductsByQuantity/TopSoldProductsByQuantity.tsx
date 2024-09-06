import useSessionStore from "../../../../stores/sessionStore";
import { useTotalQuantitySoldByProductsQuery } from "../../apis/useTotalQuantitySoldByProducts";
import TopSoldProducts from "../topSoldProducts/TopSoldProducts";

function TopSoldProductsByQuantity() {
  const { session } = useSessionStore();
  const productsSoldByQuantity = useTotalQuantitySoldByProductsQuery(
    session?.id,
  );

  const buildChartData = () => {
    if (!productsSoldByQuantity.data) return [];

    return productsSoldByQuantity.data.map((d) => {
      return {
        group: d.title,
        value: d.quantity,
      };
    });
  };

  return (
    <TopSoldProducts
      data={buildChartData()}
      title="Top Sold Products (By Quantity)"
    />
  );
}

export default TopSoldProductsByQuantity;
