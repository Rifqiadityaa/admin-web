import DrawerMenu from "@/components/DrawerMenu";
import { InferGetStaticPropsType } from "next";

export type Product = {
  title: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
};

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DrawerMenu products={products} pageToDisplay="PRODUCTS" />;
}

export const getStaticProps = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return {
    props: {
      products: data.products,
    },
  };
};
