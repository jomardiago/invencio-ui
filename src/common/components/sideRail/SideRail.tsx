import { Button, Theme } from "@carbon/react";
import { Close } from "@carbon/icons-react";
import classes from "./SideRail.module.scss";

type SideRailProps = {
  isOpen: boolean;
  onCloseHandler: () => void;
  title: string;
  children: React.ReactNode;
};

function SideRail({ isOpen, onCloseHandler, title, children }: SideRailProps) {
  const className = isOpen
    ? `${classes.container} ${classes.open}`
    : `${classes.container}`;

  return (
    <Theme theme="white" className={className}>
      <div className={classes.closeButton}>
        <Button
          renderIcon={Close}
          iconDescription="Close"
          tooltipPosition="left"
          kind="ghost"
          onClick={onCloseHandler}
          hasIconOnly
        />
      </div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </Theme>
  );
}

export default SideRail;
