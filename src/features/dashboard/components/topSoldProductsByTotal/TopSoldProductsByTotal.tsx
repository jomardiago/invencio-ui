import useSessionStore from "../../../../stores/sessionStore";
import { useTotalSoldByProducts } from "../../apis/useTotalSoldByProducts";
import TopSoldProducts from "../topSoldProducts/TopSoldProducts";

function TopSoldProductsByTotal() {
  const { session } = useSessionStore();
  const productsSoldByTotal = useTotalSoldByProducts(session?.id);

  const buildChartData = () => {
    if (!productsSoldByTotal.data) return [];

    return productsSoldByTotal.data.map((d) => {
      return {
        group: d.title,
        value: d.total,
      };
    });
  };

  return (
    <TopSoldProducts
      data={buildChartData()}
      title="Top Sold Products (By Total)"
    />
  );
}

export default TopSoldProductsByTotal;
