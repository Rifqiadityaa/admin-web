import DrawerMenu from "@/components/DrawerMenu";
import { InferGetStaticPropsType } from "next";

export type Cart = {
  id: number;
  userId: number;
};

export default function Carts({
  carts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DrawerMenu carts={carts} pageToDisplay="CARTS" />;
}

export const getStaticProps = async () => {
  const res = await fetch("https://dummyjson.com/carts");
  const data = await res.json();

  return {
    props: {
      carts: data.carts,
    },
  };
};
