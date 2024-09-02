import { useState } from "react";
import UsersForm from "./components/usersForm/UsersForm";
import UsersTable from "./components/usersTable/UsersTable";
import SideRail from "../../common/components/sideRail/SideRail";

function Users() {
  const [isUsersFormOpen, setIsUsersFormOpen] = useState(false);

  return (
    <div>
      <SideRail
        isOpen={isUsersFormOpen}
        onCloseHandler={() => setIsUsersFormOpen(false)}
      >
        <UsersForm />
      </SideRail>
      <UsersTable onAddNewClickHandler={() => setIsUsersFormOpen(true)} />
    </div>
  );
}

export default Users;
