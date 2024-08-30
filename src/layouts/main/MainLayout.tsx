import { Theme } from "@carbon/react";
import classes from "./MainLayout.module.scss";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme="g10" className={classes.container}>
      {children}
    </Theme>
  );
}

export default MainLayout;
