
import Table from "./Table";
import { TableContextProvider } from "../context";

const PaleoTable = ({ options }) => {
  return (
    <TableContextProvider>
      <Table options={options} />
    </TableContextProvider>
  );
};

export default PaleoTable;

