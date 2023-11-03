"use client";
import StationGrid from "@/components/data/StationsGrid";
import { useGetConsoles } from "@/utils/hooks/useConsole";
import { useGetEarningsGrid } from "@/utils/hooks/useSession";
import { useGetSpots } from "@/utils/hooks/useSpot";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { format } from "timeago.js";
import Box from "@mui/material/Box";
const Console = () => {
  const { data: sessions } = useGetEarningsGrid();
  const { data: consoles } = useGetConsoles();
  const { data: spots } = useGetSpots();
  if (!sessions || !consoles || !spots) return <div>Loading...</div>;

  const columns: GridColDef[] = [
    {
      headerName: "Console",
      field: "console",
      renderCell: (params) =>
        consoles.find((console) => console._id === params.value)?.name || "",
    },
    {
      headerName: "Spot",
      field: "spot",
      renderCell: (params) =>
        spots.find((spot) => spot._id === params.value)?.name,
    },

    {
      headerName: "Amount",
      field: "amount",
      renderCell: (params) => params.value.toFixed(2),
    },
  ];

  return (
    <Box m={2}>
      <StationGrid columns={columns} rows={sessions || []} />
    </Box>
  );
};

export default Console;
