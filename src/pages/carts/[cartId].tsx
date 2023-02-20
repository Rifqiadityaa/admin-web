import DrawerMenu from "@/components/DrawerMenu";
import { useRouter } from "next/router";

export default function CartDetail() {
  const router = useRouter();

  const { cartId, userId } = router.query;

  return (
    <>
      {router.isReady && (
        <DrawerMenu
          cartId={cartId}
          userId={userId}
          pageToDisplay="CART_DETAIL"
        />
      )}
    </>
  );
}
