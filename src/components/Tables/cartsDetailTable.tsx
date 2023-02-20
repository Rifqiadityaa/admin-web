import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { productInCartColumns } from "@/data/tableColumnsData";
import { CustomToolbar } from "@/utils/tablesUtils";
import { useEffect, useState } from "react";
import { fetchCartDetail, fetchUserInfo } from "@/services/api";
import LinearProgress from "@mui/material/LinearProgress";
import type { Product } from "@/pages";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface CartsDetailTableProps {
  id: string | string[] | undefined;
  userId: string | string[] | undefined;
}

type CartDetail = {
  products: Product[];
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
};

export default function CartsDetailTable(props: CartsDetailTableProps) {
  const { id, userId } = props;

  const [cartDetail, setCartDetail] = useState<CartDetail>();
  const [userName, setUserName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function getDatas() {
      const [cartDetail, userDetail] = await Promise.allSettled([
        fetchCartDetail(id),
        fetchUserInfo(userId),
      ]);

      if (
        cartDetail.status === "fulfilled" &&
        userDetail.status === "fulfilled"
      ) {
        setCartDetail(cartDetail.value);
        setUserName(
          `${userDetail.value.firstName} ${userDetail.value.lastName}`
        );
        setProducts(cartDetail.value.products);
        setIsReady(true);
      }
    }
    getDatas();
  }, []);

  return (
    <Box sx={{ width: "70%" }}>
      <Typography sx={{ marginBottom: "1.5rem" }} variant="h5">
        Cart Detail
      </Typography>
      <Card
        sx={{
          width: "30%",
          marginBottom: "2rem",
          padding: "0.2rem",
          backgroundColor: "#1976D2",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "0.5rem",
            borderRadius: "2px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
            }}
          >{`Client Name: ${userName}`}</Typography>
          <Typography sx={{ fontSize: "0.875rem" }}>{`Total Amount: ${
            cartDetail ? cartDetail.discountedTotal : ""
          }`}</Typography>
        </Box>
      </Card>
      <DataGrid
        rows={products}
        columns={productInCartColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
        }}
        loading={isReady ? false : true}
        autoHeight
        sx={{
          marginBottom: "5rem",
        }}
      />
    </Box>
  );
}
