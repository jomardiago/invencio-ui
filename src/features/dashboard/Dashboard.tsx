import UsersCountWidget from "./components/usersCountWidget/UsersCountWidget";
import CategoriesCountWidget from "./components/categoriesCountWidget/CategoriesCountWidget";
import ProductsCountWidget from "./components/productsCountWidget/ProductsCountWidget";
import TotalSalesWidget from "./components/totalSalesWidget/TotalSalesWidget";
import classes from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.countWidgets}>
        <UsersCountWidget />
        <CategoriesCountWidget />
        <ProductsCountWidget />
        <TotalSalesWidget />
      </div>
    </div>
  );
}

export default Dashboard;
