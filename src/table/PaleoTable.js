
import Table from "./Table";
import { TableContextProvider } from "../context";

const PaleoTable = () => {
  return (
    <TableContextProvider>
      <Table />
    </TableContextProvider>
  );
};

export default PaleoTable;

