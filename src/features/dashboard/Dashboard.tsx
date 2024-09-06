import { Theme } from "@carbon/react";
import UsersCountWidget from "./components/usersCountWidget/UsersCountWidget";
import CategoriesCountWidget from "./components/categoriesCountWidget/CategoriesCountWidget";
import ProductsCountWidget from "./components/productsCountWidget/ProductsCountWidget";
import TotalSalesWidget from "./components/totalSalesWidget/TotalSalesWidget";
import classes from "./Dashboard.module.scss";
import TopSoldProducts from "./components/topSoldProducts/TopSoldProducts";

function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.countWidgets}>
        <UsersCountWidget />
        <CategoriesCountWidget />
        <ProductsCountWidget />
        <TotalSalesWidget />
      </div>
      <div className={classes.topChartsWrapper}>
        <Theme theme="white" className={classes.chartContainer}>
          <TopSoldProducts title="Top Sold Products (By Quantity)" />
        </Theme>
        <Theme theme="white" className={classes.chartContainer}>
          <TopSoldProducts title="Top Sold Products (By Total)" />
        </Theme>
      </div>
    </div>
  );
}

export default Dashboard;
