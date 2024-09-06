import { SimpleBarChart } from "@carbon/charts-react";

const data = [
  {
    group: "Qty",
    value: 65000,
  },
  {
    group: "More",
    value: 29123,
  },
  {
    group: "Sold",
    value: 35213,
  },
  {
    group: "Restocking",
    value: 51213,
  },
  {
    group: "Misc",
    value: 16932,
  },
];

type TopSoldProductsProps = {
  title: string;
};

function TopSoldProducts({ title }: TopSoldProductsProps) {
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
