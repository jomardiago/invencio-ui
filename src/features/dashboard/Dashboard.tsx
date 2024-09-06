import { Theme } from "@carbon/react";
import UsersCountWidget from "./components/usersCountWidget/UsersCountWidget";
import CategoriesCountWidget from "./components/categoriesCountWidget/CategoriesCountWidget";
import ProductsCountWidget from "./components/productsCountWidget/ProductsCountWidget";
import TotalSalesWidget from "./components/totalSalesWidget/TotalSalesWidget";
import TopSoldProductsByQuantity from "./components/topSoldProductsByQuantity/TopSoldProductsByQuantity";
import TopSoldProductsByTotal from "./components/topSoldProductsByTotal/TopSoldProductsByTotal";
import classes from "./Dashboard.module.scss";
import useSessionStore from "../../stores/sessionStore";

function Dashboard() {
  const { session } = useSessionStore();

  return (
    <div className={classes.container}>
      <div className={classes.countWidgets}>
        {session?.isAdmin && <UsersCountWidget />}
        <CategoriesCountWidget />
        <ProductsCountWidget />
        <TotalSalesWidget />
      </div>
      <div className={classes.topChartsWrapper}>
        <Theme theme="white" className={classes.chartContainer}>
          <TopSoldProductsByQuantity />
        </Theme>
        <Theme theme="white" className={classes.chartContainer}>
          <TopSoldProductsByTotal />
        </Theme>
      </div>
    </div>
  );
}

export default Dashboard;
