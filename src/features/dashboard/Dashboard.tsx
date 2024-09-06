import { Categories, Product, SalesOps } from "@carbon/icons-react";
import CountWidget from "./components/countWidget/CountWidget";
import classes from "./Dashboard.module.scss";
import UsersCountWidget from "./components/usersCountWidget/UsersCountWidget";

function Dashboard() {
  return (
    <div className={classes.container}>
      <div className={classes.countWidgets}>
        <UsersCountWidget />
        <CountWidget
          renderIcon={() => <Categories size={32} style={{ color: "white" }} />}
          value="8"
          label="Categories"
          iconBgColor="orange"
          flex={1}
        />
        <CountWidget
          renderIcon={() => <Product size={32} style={{ color: "white" }} />}
          value="16"
          label="Products"
          iconBgColor="cyan"
          flex={1}
        />
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
