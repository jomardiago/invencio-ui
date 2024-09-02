import {
  Button,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} from "@carbon/react";

const rows = [
  {
    id: "1",
    email: "josediago@gmail.com",
    isAdmin: true,
    createdAt: "2024-08-29T04:07:32.009Z",
    firstName: "Jose",
    lastName: "Diago",
    contactNumber: "0912-345-6789",
    address: "Manila, Philippines",
  },
];

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

function UsersTable() {
  return (
    <DataTable rows={rows} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getTableContainerProps,
      }) => (
        <TableContainer
          title="Users Management"
          description="Manage all the users in your organization."
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch />
              <TableToolbarMenu>
                <TableToolbarAction onClick={() => {}}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={() => {}}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={() => {}}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button onClick={() => {}}>Primary Button</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
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
