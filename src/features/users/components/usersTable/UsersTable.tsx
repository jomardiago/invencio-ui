import { UserMultiple } from "@carbon/icons-react";
import {
  Button,
  DataTable,
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
} from "@carbon/react";
import { format } from "date-fns";
import { useUsersQuery } from "../../../../apis/users/useUsersQuery";
import useSessionStore from "../../../../stores/sessionStore";

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

  const buildUsers = () => {
    if (!users.data) return [];

    return users.data.map((user) => ({
      id: String(user.id),
      email: user.email,
      isAdmin: user.isAdmin ? "Y" : "N",
      firstName: user.Profile?.firstName,
      lastName: user.Profile?.lastName,
      contactNumber: user.Profile?.contactNumber,
      address: user.Profile?.address,
      createdAt: format(user.createdAt, "PPPP"),
    }));
  };

  if (users.isLoading) {
    return <Loading />;
  }

  return (
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
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
              <Button onClick={onAddNewClickHandler}>Add New User</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })} key={header.key}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

export default UsersTable;
