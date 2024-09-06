import { UserMultiple } from "@carbon/icons-react";
import CountWidget from "../countWidget/CountWidget";
import { InlineLoading } from "@carbon/react";
import { useUsersCountQuery } from "../../apis/useUsersCountQuery";
import useSessionStore from "../../../../stores/sessionStore";

function UsersCountWidget() {
  const { session } = useSessionStore();
  const usersCount = useUsersCountQuery(session?.id);

  return (
    <CountWidget
      renderIcon={() => <UserMultiple size={32} style={{ color: "white" }} />}
      value={usersCount.isLoading ? <InlineLoading /> : usersCount.data || 0}
      label="Users"
      iconBgColor="magenta"
      flex={1}
    />
  );
}

export default UsersCountWidget;
