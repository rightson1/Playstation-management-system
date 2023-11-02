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
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React from "react";

const Rightbar = () => {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));

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
      <div className="flex-col-center px-2">
        <div className="w-full fb">
          <Button variant="text">Notifications</Button>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>

        <Box className="w-full flex-col-center mt-5 gap-1">
          {[1, 2, 3].map((_, i) => (
            <Box
              className="flex items-start gap-2  p-1 cursor-pointer"
              border={1}
              borderColor={colors.borderColor}
              bgcolor={colors.foreground}
              key={i}
              sx={{
                "&:hover": {
                  bgcolor: `${colors.active} !important`,
                },
              }}
            >
              <Avatar
                src="/user.jpg"
                alt="user"
                sx={{
                  width: 45,
                  height: 45,
                }}
              />
              <Box className="flex flex-col gap-1 ">
                <Typography variant="body2" className="font-500">
                  Our Playsation Pad is not working
                </Typography>
                <div className="flex justify-between">
                  <Typography variant="body2">1min ago</Typography>
                  <Button>
                    <CloseIcon fontSize="small" />
                  </Button>
                </div>
              </Box>
            </Box>
          ))}

          <Box
            py={2}
            px={1}
            className={`flex-col-start w-full `}
            sx={{
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" pb={1}>
              <Typography variant="body2">Active Gaming Spots</Typography>
            </Typography>
            <Box
              border={1}
              borderColor={colors.borderColor}
              bgcolor={colors.secondary}
              className="
              h-[200px]
              w-full p-1 overflow-hidden shadow-lg"
            >
              <Box
                src="/images/art.png"
                className="
              w-full
              "
                component="img"
              />
              <Typography variant="h5">Makombora </Typography>
              <Typography variant="body2">Fifa</Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </Drawer>
  );
};

export default Rightbar;
