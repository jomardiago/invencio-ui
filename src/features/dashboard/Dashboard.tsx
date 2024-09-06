import { SalesOps } from "@carbon/icons-react";
import CountWidget from "./components/countWidget/CountWidget";
import classes from "./Dashboard.module.scss";
import UsersCountWidget from "./components/usersCountWidget/UsersCountWidget";
import CategoriesCountWidget from "./components/categoriesCountWidget/CategoriesCountWidget";
import ProductsCountWidget from "./components/productsCountWidget/ProductsCountWidget";

function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.countWidgets}>
        <UsersCountWidget />
        <CategoriesCountWidget />
        <ProductsCountWidget />
        <CountWidget
          renderIcon={() => <SalesOps size={32} style={{ color: "white" }} />}
          value="P1,000,000.00"
          label="Sales"
          iconBgColor="green"
          flex={1.5}
        />
      </div>
    </div>
  );
}

export default Dashboard;
