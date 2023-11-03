import { useGlobalTheme } from "@/utils/themeContext";
import { styled, useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useGetSpots } from "@/utils/hooks/useSpot";
import { useAuth } from "@/utils/AuthContext";

const Rightbar = () => {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const { user } = useAuth();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const { data: spots } = useGetSpots();

  const drawerWidth = "240px";
  return (
    <Drawer
      variant={screenWidth ? "persistent" : "temporary"}
      anchor="right"
      open={screenWidth}
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        // height: "100vh",
        overflow: "hidden !important",
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "auto !important",
        },
      }}
    >
      <div className="flex flex-col items-center py-3">
        <div className={`p-[9px] ring-[.5px] ring-[#1FDF64] rounded-full`}>
          <div className={`p-[6px] ring-[1px] ring-[#1FDF64] rounded-full`}>
            <div
              className={`p-1 ring-[2px] ring-[#1FDF64] rounded-full flex-center w-[55px] h-[55px]`}
            >
              <Avatar
                sx={{
                  height: "50px",
                  width: "50px",
                }}
                className="shadow-md"
                src="/user.jpg"
                alt={user?.displayName}
              />
            </div>
          </div>
          {/* names */}
        </div>
        <Typography variant="h5">{user?.displayName || "No name"}</Typography>
      </div>

      <div className="flex-col-center px-2">
        <Box className="w-full flex-col-center mt-2 gap-1">
          <Typography variant="h6">Available Spots</Typography>
          <Box
            py={2}
            px={1}
            className={`flex-col-start w-full `}
            sx={{
              borderRadius: 1,
            }}
            bgcolor={colors.secondary}
          >
            {spots
              ?.filter((spot) => spot.status === "Available")
              .map((spot, i) => (
                <Box
                  border={1}
                  borderColor={colors.borderColor}
                  bgcolor={colors.secondary}
                  key={i}
                  className="
              h-[200px]
              w-full p-1 overflow-hidden shadow -lg"
                >
                  <Box
                    src="/images/art.png"
                    className="
              w-full
              "
                    component="img"
                  />
                  <Typography variant="h5">{spot.name}</Typography>
                  <Typography variant="body2">{spot.description}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </div>
    </Drawer>
  );
};

export default Rightbar;
