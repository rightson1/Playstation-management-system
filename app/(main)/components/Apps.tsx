import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { quickLinks } from "@/constants";
import PeopleIcon from "@mui/icons-material/People";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { useGlobalTheme } from "@/utils/themeContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
const Apps = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const apps = [
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
  ];
  return (
    <Grid container spacing={2} sx={{ p: 2 }} className="max-w-[650px]">
      <Grid xs={8} item sm={8}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {apps.map((app, index) => (
            <Grid
              item
              xs={12}
              md={6}
              className="w-full flex gap-2 items-center"
              p={1}
              borderBottom={1}
              borderColor={colors.surface}
            >
              <Avatar
                sx={{
                  bgcolor: colors.lightBlue,
                }}
              >
                {app.icon}
              </Avatar>
              <div className="flex-col-start w-full">
                <Typography variant="h6" className="w-full">
                  {app.name}
                </Typography>
                <div className="fb w-full">
                  <Typography variant="body2" color={colors.green[600]}>
                    {app.link}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4} md={4}>
        <Typography variant="h5" py={2}>
          Forms
        </Typography>
        <Grid container spacing={1}>
          {quickLinks.map((link, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              onClick={() => router.push(link.link)}
              className="cursor-pointer"
            >
              <Typography variant="body2" color={colors.green[600]}>
                {link.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Apps;
