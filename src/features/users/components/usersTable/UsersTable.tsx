import { UserMultiple } from "@carbon/icons-react";
import {
  Button,
  DataTable,
  InlineNotification,
  Loading,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Toggle,
} from "@carbon/react";
import { format } from "date-fns";
import useSessionStore from "../../../../stores/sessionStore";
import { User, useUsersQuery } from "../../apis/useUsersQuery";
import { useUpdateUserRoleMutation } from "../../apis/useUpdateUserRoleMutation";

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
];

function UsersTable({ onAddNewClickHandler }: UsersTableProps) {
  const { session } = useSessionStore();
  const users = useUsersQuery(session?.id);
  const updateUserRole = useUpdateUserRoleMutation(session?.id);

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

  if (users.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        {updateUserRole.isSuccess && (
          <InlineNotification
            kind="success"
            title="Update User Role:"
            subtitle={updateUserRole.data?.message}
            lowContrast
          />
        )}
      </div>

      <DataTable rows={buildUsers()} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getToolbarProps,
          getTableContainerProps,
          onInputChange,
        }) => (
          <TableContainer
            title={
              <div>
                <UserMultiple /> Users Management
              </div>
            }
            description="Manage all the users in your organization."
            {...getTableContainerProps()}
          >
            <TableToolbar
              {...getToolbarProps()}
              aria-label="data table toolbar"
            >
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Button onClick={onAddNewClickHandler}>Add New User</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label="sample table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({ header })}
                      key={header.key}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })} key={row.id}>
                    {row.cells.map((cell) => {
                      const userData = users.data?.find(
                        (d) => d.id === Number(row.id),
                      );

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

                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
}

export default UsersTable;
