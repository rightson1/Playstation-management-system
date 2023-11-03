import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Pie({
  pieData,
}: {
  pieData: {
    id: string;
    value: number;
    label: string;
  }[];
}) {
  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={400}
      arcLabelMinAngle={true}
      height={250}
      sx={{
        ml: 8,
      }}
      // slotProps={{
      //   legend: {
      //     direction: "row",
      //     position: { vertical: "bottom", horizontal: "middle" },
      //     padding: 0,
      //     //   display:'none',
      //   },
      // }}
    />
  );
}
