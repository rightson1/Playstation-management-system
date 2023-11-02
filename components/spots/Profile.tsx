import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useGlobalTheme } from "@/utils/themeContext";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NotificationCard } from "../helpers/atoms";
const Profile = () => {
  const { colors } = useGlobalTheme();
  return (
    <Grid bgcolor={colors.foreground} spacing={1} p={1}>
      <Grid item xs={12} md={6} className="flex flex-col  gap-3 pb-20">
        <Typography variant="h4">Stats</Typography>
        <Typography>Rate is 160 ksh per hour</Typography>
        <Box className="fx-between">
          <Typography variant="h5">Time Played</Typography>
          <Typography>2 hours</Typography>
        </Box>
        <Box className="fx-between">
          <Typography variant="h5">Amount</Typography>
          <Typography>60 minutes</Typography>
        </Box>
        <div className="flex justify-end gap-5">
          <Button variant="outlined" color="secondary">
            Stop
          </Button>
          <Button variant="outlined" color="secondary">
            Play
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={6} className="flex flex-col gap-2">
        <Typography variant="h4">Notifications</Typography>
        <NotificationCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
