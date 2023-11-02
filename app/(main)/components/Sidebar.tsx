"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { menuType, openProps } from "@/types";
import { Button, Chip, useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
const drawerWidth = "220px";

export default function Sidebar({ open, setOpen }: openProps) {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu: menuType[] = [
    {
      name: "Pages",
      links: [
        {
          name: "Home",
          icon: <HomeIcon />,
          link: "/",
        },
        {
          name: "Gamming Spots",
          icon: <MyLocationIcon />,
          link: "/locations",
        },
        {
          name: "Games",
          icon: <SportsEsportsIcon />,
          link: "/games",
        },
        {
          name: "Consoles",
          icon: <VideogameAssetIcon />,
          link: "/consoles",
        },
        {
          name: "Notifications",
          icon: <NotificationsIcon />,
          link: "/notifications",
        },
      ],
    },
    {
      name: "Earnings",
      links: [
        {
          name: "Games",
          icon: <SportsEsportsIcon />,
          info: "3",
          link: "/communities",
        },
        {
          name: "Consoles",
          icon: <VideogameAssetIcon />,
          info: "3",
          link: "/events",
        },
      ],
    },
  ];

  return (
    <Drawer
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
        },
      }}
      variant={screenWidth ? "permanent" : "temporary"}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="logo"
        sx={{
          width: "100px",
        }}
        p={1}
        className="mt-5 mr-2"
      />

      <Divider />

      {menu.map((item, index) => (
        <Box
          key={index}
          border={1}
          borderColor={colors.borderColor}
          bgcolor={colors.foreground}
        >
          <List disablePadding>
            <ListItem>
              <ListItemText primary={item.name} />
            </ListItem>
          </List>
          <List disablePadding>
            {item.links.map((text, index) => (
              <Box
                onClick={() => router.push(text.link)}
                // className="w-full fb px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                sx={{
                  "&:hover": {
                    bgcolor: `${colors.active} !important`,
                  },
                  display: "flex !important",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  my: 0.2,
                  py: 1,
                  width: "100%",
                  bgcolor: `${colors.surface} !important`,
                }}
                key={text.name}
                className="cursor-pointer"
                borderColor={colors.borderColor}
                bgcolor={colors.foreground}
              >
                <Button startIcon={text.icon}>{text.name}</Button>
                {text.info && (
                  <Chip
                    label={text.info}
                    size="small"
                    variant="filled"
                    color="secondary"
                  />
                )}
              </Box>
            ))}
          </List>
          <Divider />
        </Box>
      ))}
      <Divider />
    </Drawer>
  );
}
