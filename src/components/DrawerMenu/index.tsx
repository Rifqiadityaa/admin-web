import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Main, DrawerHeader } from "./styles";
import type { Product } from "@/pages";
import type { Cart } from "@/pages/carts";
import ProductsTable from "../Tables/productsTable";
import CartsTable from "../Tables/cartsTable";
import NextLink from "next/link";
import CartsDetailTable from "../Tables/cartsDetailTable";

interface DrawerMenuProps {
  products?: Product[];
  carts?: Cart[];
  cartId?: string | string[] | undefined;
  userId?: string | string[] | undefined;
  pageToDisplay?: string;
}

const DrawerMenu = (props: DrawerMenuProps) => {
  const { products, carts, pageToDisplay, cartId, userId } = props;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getPageToDisplay = (pageToDisplay: string | undefined) => {
    switch (pageToDisplay) {
      case "PRODUCTS":
        return <ProductsTable products={products!} />;
      case "CARTS":
        return <CartsTable carts={carts!} />;
      case "CART_DETAIL":
        return <CartsDetailTable id={cartId} userId={userId} />;
    }
  };

  return (
    <Box
      sx={{
        padding: "5px",
      }}
    >
      <CssBaseline />
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Products", "Cart"].map((drawerItem, i) => (
            <NextLink
              key={i}
              href={i === 0 ? "/" : "/carts"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem key={i} disablePadding>
                <ListItemButton
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon>
                    {i === 0 ? <Inventory2Icon /> : <ShoppingCartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={drawerItem} />
                </ListItemButton>
              </ListItem>
            </NextLink>
          ))}
        </List>
      </Drawer>
      <Main open={open}>{getPageToDisplay(pageToDisplay)}</Main>
    </Box>
  );
};

export default DrawerMenu;
