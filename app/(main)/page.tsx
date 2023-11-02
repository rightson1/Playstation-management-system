"use client";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { Avatar } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { border } from "@/components/helpers/atoms";
import StationGrid from "@/components/data/StationsGrid";
import Pie from "@/components/data/Pie";
const Home = () => {
  const { colors } = useGlobalTheme();
  const cards = [
    {
      name: "Clubs In",
      count: 10,
      color: colors.red[400],
    },
    {
      name: "Events",
      count: 4,
      color: colors.green[400],
    },
  ];
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
                Welcome back Mathew Anderson!
              </Typography>
            </Box>
            <Box className="fxc mt-5">
              <div className="fx-start">
                <Typography className="text-3xl m-0 font-[700]">
                  KSH 2000
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
            <img src="/game.svg" alt="" className="h-28" />
            <Typography className="text-2xl m-0 font-[700]">
              Free Spots
            </Typography>
            <Typography variant="h6">10</Typography>
          </Box>
          <Box className="w-full fxc-center" {...border()} p={1}>
            <img src="/black-controller.svg" alt="" className="h-26" />
            <Typography className="text-2xl m-0 font-[700]">
              Free Spots
            </Typography>
            <Typography variant="h6">10</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} p={0.3}>
          <StationGrid />
        </Grid>
        <Grid item xs={12} md={5} p={0.3} className="">
          <Box
            className="w-full flex-center h-[75vh] after:"
            {...border()}
            p={1}
          >
            <Pie />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
