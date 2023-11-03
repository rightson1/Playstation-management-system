import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useGetSessionMembers } from "@/utils/hooks/useSession";
import { GridColDef } from "@mui/x-data-grid";
import StationGrid from "../data/StationsGrid";
const Members = () => {
  const params = useParams();
  const id = params.session;
  const { data: session, isLoading } = useGetSessionMembers(id);
  const rows = session?.players || [];
  console.log(rows);
  const columns: GridColDef[] = [
    {
      field: "displayName",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "sessionCode",
      headerName: "Code",
      width: 200,
    },
  ];

  return (
    <Box>
      <Box className="">
        <StationGrid columns={columns} rows={session?.players || []} />
      </Box>
    </Box>
  );
};

export default Members;
