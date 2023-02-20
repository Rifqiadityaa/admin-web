import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Product } from "@/pages";
import { getBrandItemCount, getUniqueBrands } from "@/utils/productChartUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductChartProps {
  products: Product[];
}

const ProductChart = (props: ProductChartProps) => {
  const { products } = props;

  const productBrands = products.map((product) => product.brand).sort();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Item per product chart",
      },
    },
  };

  const chartData = {
    labels: getUniqueBrands(productBrands),
    datasets: [
      {
        label: "Item",
        data: getBrandItemCount(productBrands),
        backgroundColor: "#1976d2",
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};

export default ProductChart;
