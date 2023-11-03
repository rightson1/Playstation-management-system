"use client";
import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { Avatar } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { border } from "@/components/helpers/atoms";
import StationGrid from "@/components/data/StationsGrid";
import Pie from "@/components/data/Pie";
import { useGetSpots } from "@/utils/hooks/useSpot";
import { useGetGames } from "@/utils/hooks/useGame";
import { GridColDef } from "@mui/x-data-grid";
import { useGetConsoleTypes } from "@/utils/hooks/useConsoleType";
import { useGetEarningsGrid } from "@/utils/hooks/useSession";
import { useAuth } from "@/utils/AuthContext";
const Home = () => {
  const { colors } = useGlobalTheme();
  const { data: spots } = useGetSpots();
  const { data: games } = useGetGames();
  const { data: consoleTypes } = useGetConsoleTypes();
  const { data: earnings } = useGetEarningsGrid();

  const { user } = useAuth();
  const pieData = useMemo(() => {
    if (consoleTypes) {
      return consoleTypes.map((consoleType) => {
        return {
          id: consoleType._id,
          value: Number(consoleType.rate),
          label: consoleType.name,
        };
      });
    } else {
      return [];
    }
  }, [consoleTypes]);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "consoleType.name",
      headerName: "PlayStation",
      width: 150,
      valueGetter: (params) => params.row.consoleType.name,
    },
    {
      field: "consoleType.rate",
      headerName: "Rate",
      width: 150,
      valueGetter: (params) => params.row.consoleType.rate,
    },
  ];
  const currentDate = new Date().toISOString().split("T")[0];
  const todayElements = earnings?.filter((item) =>
    item.createdAt.startsWith(currentDate)
  );

  // Calculate the total of 'amount' for elements whose 'createdAt' is today
  const totalAmountToday = todayElements?.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <Box p={1} className="w-full">
      <Grid container rowSpacing={1}>
        <Grid item xs={12} md={6} p={0.3}>
          <Box
            p={1}
            {...border()}
            className="flex flex-col items-start relative h-[200px] overflow-hidden"
          >
            <Box pt={1} className="flex gap-2 justify-center items-center">
              <Avatar src="/user.jpg" />
              <Typography variant="h5" className="m-0 inline-block">
                Welcome back {user?.displayName || ""}
              </Typography>
            </Box>
            <Box className="fxc mt-5">
              <div className="fx-start">
                <Typography className="text-3xl m-0 font-[700]">
                  KSH {totalAmountToday}
                </Typography>
                <NorthEastIcon
                  className="text-4xl"
                  sx={{
                    color: colors.lightBlue,
                  }}
                />
              </div>
              <Typography variant="body1" className="m-0">
                Todays Earnings
              </Typography>
            </Box>
            <Box
              component={"img"}
              src="/welcome.svg"
              className="absolute  -right-2 h-full overflow-hidden"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className="flex gap-1" p={0.3}>
          <Box className="w-full fxc-center after:" {...border()} p={1}>
            <img src="/game.svg" alt="" className="h-26" />
            <Typography className="text-xl m-0 font-[700]">
              Gamming Spots
            </Typography>
            <Typography variant="h6">{spots?.length}</Typography>
          </Box>
          <Box className="w-full fxc-center" {...border()} p={1}>
            <img src="/black-controller.svg" alt="" className="h-26" />
            <Typography className="text-xl m-0 font-[700]">
              Free Spots
            </Typography>
            <Typography variant="h6">
              {spots?.filter((spot) => spot.status === "Available").length}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} p={0.3}>
          <StationGrid columns={columns} rows={games || []} />
        </Grid>
        <Grid item xs={12} md={6} p={0.3} className="">
          <Box
            className="w-full items-center flex-center h-[75vh] flex-col justify-center p-4 overflow-hidden"
            {...border()}
            p={1}
          >
            <Typography variant="h3" color="skyblue">
              Console Rates
            </Typography>
            <Pie pieData={pieData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
