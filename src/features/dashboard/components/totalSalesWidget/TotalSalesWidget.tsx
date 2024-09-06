import { SalesOps } from "@carbon/icons-react";
import CountWidget from "../countWidget/CountWidget";
import { InlineLoading } from "@carbon/react";
import useSessionStore from "../../../../stores/sessionStore";
import { useTotalSalesQuery } from "../../apis/useTotalSalesQuery";
import { formatToCurrency } from "../../../../common/utils/formatToCurrency";

function TotalSalesWidget() {
  const { session } = useSessionStore();
  const totalSales = useTotalSalesQuery(session?.id);

  return (
    <CountWidget
      renderIcon={() => <SalesOps size={32} style={{ color: "white" }} />}
      value={
        totalSales.isLoading ? (
          <InlineLoading />
        ) : (
          formatToCurrency(totalSales.data || "0")
        )
      }
      label="Sales"
      iconBgColor="green"
      flex={1.5}
    />
  );
}

export default TotalSalesWidget;
