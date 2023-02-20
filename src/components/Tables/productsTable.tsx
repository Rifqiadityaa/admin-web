import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import type { Product } from "@/pages";
import { Box } from "@mui/system";
import ProductChart from "../ProductChart";
import { productColumns } from "@/data/tableColumnsData";
import { CustomToolbar } from "@/utils/tablesUtils";
import Typography from "@mui/material/Typography";

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable = (props: ProductsTableProps) => {
  const { products } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>(products!);

  useEffect(() => {
    setFilteredData(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <Box sx={{ width: "70%" }}>
      <Typography sx={{ marginBottom: "1.5rem" }} variant="h5">
        Products
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search Product"
        variant="outlined"
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: "1.5rem",
        }}
      />
      <DataGrid
        rows={filteredData}
        columns={productColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbar }}
        autoHeight
        sx={{
          marginBottom: "5rem",
        }}
      />
      <ProductChart products={products} />
    </Box>
  );
};

export default ProductsTable;
