import { useState } from "react";
import { TrashCan, UserMultiple } from "@carbon/icons-react";
import {
  Button,
  InlineNotification,
  Loading,
  Modal,
  TableCell,
  Toggle,
} from "@carbon/react";
import { format } from "date-fns";
import useSessionStore from "../../../../stores/sessionStore";
import { User, useUsersQuery } from "../../apis/useUsersQuery";
import { useUpdateUserRoleMutation } from "../../apis/useUpdateUserRoleMutation";
import { useDeleteUserMutation } from "../../apis/useDeleteUserMutation";
import DataTable from "../../../../common/components/dataTable/DataTable";

type UsersTableProps = {
  onAddNewClickHandler: () => void;
};

const headers = [
  {
    key: "email",
    header: "Email",
  },
  {
    key: "isAdmin",
    header: "Admin?",
  },
  {
    key: "firstName",
    header: "First Name",
  },
  {
    key: "lastName",
    header: "Last Name",
  },
  {
    key: "contactNumber",
    header: "Contact No.",
  },
  {
    key: "address",
    header: "Address",
  },
  {
    key: "createdAt",
    header: "Member Since",
  },
  {
    key: "deleteUser",
    header: "",
  },
];

function UsersTable({ onAddNewClickHandler }: UsersTableProps) {
  const { session } = useSessionStore();
  const users = useUsersQuery(session?.id);
  const updateUserRole = useUpdateUserRoleMutation(session?.id);
  const deleteUser = useDeleteUserMutation(session?.id);

  const [deleteConfig, setDeleteConfig] = useState<{
    isOpen: boolean;
    data: User | undefined;
  }>({
    isOpen: false,
    data: undefined,
  });

  const buildUsers = () => {
    if (!users.data) return [];

    return users.data.map((user) => ({
      id: String(user.id),
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.Profile?.firstName,
      lastName: user.Profile?.lastName,
      contactNumber: user.Profile?.contactNumber,
      address: user.Profile?.address,
      createdAt: format(user.createdAt, "PPPP"),
    }));
  };

  const onToggleHandler = (data: User, value: boolean) => {
    updateUserRole.mutate({ id: data.id, isAdmin: value });
  };

  const onDeleteUserHandler = () => {
    if (deleteConfig.data?.id) {
      deleteUser.mutate(deleteConfig.data.id, {
        onSuccess: () => setDeleteConfig({ isOpen: false, data: undefined }),
      });
    }
  };

  if (users.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Loading active={updateUserRole.isPending || deleteUser.isPending} />

      <Modal
        open={deleteConfig.isOpen}
        onRequestClose={() =>
          setDeleteConfig({ isOpen: false, data: undefined })
        }
        modalHeading={`Are you sure you want to delete ${deleteConfig.data?.email}? It will delete the record in the database permanently.`}
        modalLabel="User"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onDeleteUserHandler}
        danger
      />

      <div>
        {updateUserRole.isSuccess && (
          <InlineNotification
            kind="success"
            title="Update User Role:"
            subtitle={updateUserRole.data?.message}
            lowContrast
          />
        )}

        {deleteUser.isSuccess && (
          <InlineNotification
            kind="success"
            title="Delete User:"
            subtitle={deleteUser.data?.message}
            lowContrast
          />
        )}
        {deleteUser.isError && (
          <InlineNotification
            kind="error"
            title="Delete User Failed:"
            subtitle={deleteUser.error?.message}
            lowContrast
          />
        )}
      </div>

      <DataTable
        key="usersTable"
        data={buildUsers()}
        headers={headers}
        title={
          <div>
            <UserMultiple /> Users Management
          </div>
        }
        description="Manage all the users in your organization."
        tableLabel="Users Table"
        addNewConfig={{
          onClick: onAddNewClickHandler,
          buttonLabel: "Add New User",
        }}
        renderRow={(rowId, cell) => {
          const userData = users.data?.find((d) => d.id === Number(rowId));

          if (cell.id.includes("isAdmin") && userData) {
            return (
              <TableCell key={cell.id}>
                <Toggle
                  size="sm"
                  labelText=""
                  labelA="No"
                  labelB="Yes"
                  defaultToggled={userData?.isAdmin}
                  id="isAdmin"
                  onToggle={(value: boolean) =>
                    onToggleHandler(userData, value)
                  }
                />
              </TableCell>
            );
          }

          if (cell.id.includes("deleteUser") && userData) {
            return (
              <TableCell key={cell.id}>
                <Button
                  renderIcon={TrashCan}
                  iconDescription="Delete User"
                  tooltipPosition="left"
                  kind="danger"
                  onClick={() =>
                    setDeleteConfig({
                      isOpen: true,
                      data: userData,
                    })
                  }
                  hasIconOnly
                />
              </TableCell>
            );
          }

          return <TableCell key={cell.id}>{cell.value}</TableCell>;
        }}
      />
    </div>
  );
}

export default UsersTable;
