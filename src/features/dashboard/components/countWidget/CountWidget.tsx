import { Theme } from "@carbon/react";
import classes from "./CountWidget.module.scss";

type CountWidgetProps = {
  iconBgColor: "magenta" | "orange" | "cyan" | "green";
  value: string;
  label: string;
  flex?: number;
  renderIcon: () => React.ReactNode;
};

function CountWidget({
  iconBgColor,
  value,
  label,
  flex = 1,
  renderIcon,
}: CountWidgetProps) {
  const getIconBgColor = () => {
    switch (iconBgColor) {
      case "magenta":
        return classes.magenta;
      case "orange":
        return classes.orange;
      case "cyan":
        return classes.cyan;
      case "green":
        return classes.green;
      default:
        return classes.gray;
    }
  };

  return (
    <Theme theme="white" className={classes.container} style={{ flex }}>
      <div className={classes.mainWrapper}>
        <div className={`${classes.iconWrapper} ${getIconBgColor()}`}>
          {renderIcon()}
        </div>
        <div className={classes.contentWrapper}>
          <span className={classes.value}>{value}</span>
          <span className={classes.label}>{label}</span>
        </div>
      </div>
    </Theme>
  );
}

export default CountWidget;
