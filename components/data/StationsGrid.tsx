import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { border } from "@/components/helpers/atoms";

const columns: GridColDef[] = [
  { field: "location", headerName: "Location", width: 150 },
  { field: "console", headerName: "Console", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "lastUsed", headerName: "Last Used", width: 150 },
  { field: "game", headerName: "Game", width: 150 },
];
const rows: GridRowsProp = [
  {
    location: "G-030",
    console: "PS4",
    status: "Available",
    lastUsed: "2 days ago",
    game: "Fifa 21",
  },
  {
    location: "G-031",
    console: "Xbox One",
    status: "In use",
    lastUsed: "1 day ago",
    game: "Call of Duty: Warzone",
  },
  {
    location: "G-032",
    console: "PS4",
    status: "Available",
    lastUsed: "5 days ago",
    game: "Minecraft",
  },
  {
    location: "G-033",
    console: "Nintendo Switch",
    status: "Available",
    lastUsed: "2 days ago",
    game: "The Legend of Zelda: Breath of the Wild",
  },
  {
    location: "G-034",
    console: "PS4",
    status: "In use",
    lastUsed: "4 days ago",
    game: "Fortnite",
  },
  {
    location: "G-035",
    console: "Xbox One",
    status: "Available",
    lastUsed: "7 days ago",
    game: "Red Dead Redemption 2",
  },
  {
    location: "G-036",
    console: "PS4",
    status: "Available",
    lastUsed: "1 day ago",
    game: "FIFA 22",
  },
  {
    location: "G-037",
    console: "Nintendo Switch",
    status: "In use",
    lastUsed: "6 days ago",
    game: "Animal Crossing: New Horizons",
  },
  {
    location: "G-038",
    console: "PS4",
    status: "Available",
    lastUsed: "3 days ago",
    game: "The Witcher 3: Wild Hunt",
  },
  {
    location: "G-039",
    console: "Xbox One",
    status: "Available",
    lastUsed: "2 days ago",
    game: "Halo: Infinite",
  },
];
export default function StationGrid() {
  const { colors } = useGlobalTheme();
  const borderString = `1px solid ${colors.borderColor} !important`;
  return (
    <Box
      height="75vh"
      width={"full"}
      {...border()}
      sx={{
        bgcolor: colors.secondary,

        "& .MuiDataGrid-root": {
          border: "none",

          width: "full",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: borderString,
        },

        "& .MuiDataGrid-toolbarContainer": {
          bgcolor: colors.foreground + " !important",
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: colors.foreground + " !important",
          borderBottom: borderString,
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.surface + " !important",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: borderString,
          bgcolor: colors.foreground + " !important",
        },
        "& .MuiCheckbox-root": {
          color: `${colors.indigo[200]} !important`,
        },

        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          // color: ` ${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.location}
      />
    </Box>
  );
}
