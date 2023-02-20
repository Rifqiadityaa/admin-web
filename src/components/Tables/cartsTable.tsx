import { DataGrid } from "@mui/x-data-grid";
import type { Cart } from "@/pages/carts";
import { Box } from "@mui/system";
import { cartColumns } from "@/data/tableColumnsData";
import { CustomToolbar } from "@/utils/tablesUtils";
import Router from "next/router";
import Typography from "@mui/material/Typography";

interface CartsTableProps {
  carts: Cart[];
}

const CartsTable = (props: CartsTableProps) => {
  const { carts } = props;

  const handleOnRowClick = (rows: any) => {
    Router.push({
      pathname: `/carts/${rows.row.id}`,
      query: {
        userId: `${rows.row.userId}`,
      },
    });
  };

  return (
    <Box sx={{ width: "70%" }}>
      <Typography sx={{ marginBottom: "1.5rem" }} variant="h5">
        Carts
      </Typography>
      <DataGrid
        rows={carts}
        columns={cartColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbar }}
        autoHeight
        sx={{
          marginBottom: "5rem",
        }}
        onRowClick={handleOnRowClick}
      />
    </Box>
  );
};

export default CartsTable;
