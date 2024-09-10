import { ToastNotification as CarbonToastNotification } from "@carbon/react";
import classes from "./ToastNotification.module.scss";
import useToastNotificationStore from "../../../stores/toastNotificationStore";

function ToastNotification() {
  const { toastNotificaton, setToastNotification } =
    useToastNotificationStore();

  if (!toastNotificaton) return null;

  return (
    <div className={classes.container}>
      <CarbonToastNotification
        kind={toastNotificaton.kind}
        role="alert"
        caption={new Date().toDateString()}
        timeout={3000}
        title={toastNotificaton.title}
        subtitle={toastNotificaton.subTitle}
        onClose={() => setToastNotification(undefined)}
      />
    </div>
  );
}

export default ToastNotification;
