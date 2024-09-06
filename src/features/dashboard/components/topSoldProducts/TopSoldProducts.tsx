import { SimpleBarChart } from "@carbon/charts-react";

type TopSoldProductsProps = {
  title: string;
  data: {
    group: string;
    value: number;
  }[];
};

function TopSoldProducts({ title, data }: TopSoldProductsProps) {
  const options = {
    title,
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        mapsTo: "group",
        scaleType: "labels",
      },
    },
    height: "400px",
    width: "100%",
  };

  return <SimpleBarChart data={data} options={options} />;
}

export default TopSoldProducts;
