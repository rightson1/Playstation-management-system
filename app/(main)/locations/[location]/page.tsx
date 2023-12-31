"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Image from "next/image";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import GamepadIcon from "@mui/icons-material/Gamepad";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import Members from "@/components/spots/Members";
import Profile from "@/components/spots/Profile";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useGetSingleSpot } from "@/utils/hooks/useSpot";
const Page = () => {
  const { colors } = useGlobalTheme();
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const id = params.location;
  const { data: fetchedSpot, isLoading } = useGetSingleSpot(id);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (fetchedSpot) {
    const spotInfo = [
      {
        title: "Players",
        value: 10,
        icon: <EmojiPeopleIcon />,
      },
      {
        title: "Game",
        value: fetchedSpot?.game?.name,
        icon: <GamepadIcon />,
      },
      {
        title: "Console",
        value: fetchedSpot?.console?.name,
        icon: <VideogameAssetIcon />,
      },
    ];
    const spotTabs = [
      {
        name: "Profile",
        component: <Profile spot={fetchedSpot} player={false} />,
        value: 0,
      },
      {
        name: "Members",
        component: <Members />,
        value: 1,
      },
    ];
    return (
      <Box m={1}>
        <Box bgcolor={colors.secondary} className="overflow-hidden">
          <div className="relative">
            <Image
              src={fetchedSpot?.image}
              alt={fetchedSpot?.name}
              height={1000}
              unoptimized
              className="h-[200px] w-full object-cover "
              width={1000}
            />{" "}
            <div
              className="flex flex-col items-center -bottom-20 left-1/2
             translate-x-[-50%]  absolute"
            >
              <Image
                height={1000}
                unoptimized
                className="h-[70px] w-[70px] rounded-full "
                width={1000}
                src={fetchedSpot?.console.image}
                alt="cover image"
              />
              <Box className="flex-col items-center justify-center w-full ">
                <Typography variant="h4" className="mt-2 text-center">
                  {fetchedSpot?.name}
                </Typography>
                <Typography variant="body2" className="mb-2 text-center">
                  {fetchedSpot?.status}
                </Typography>
              </Box>
            </div>
          </div>

          <Grid
            container
            sx={{
              mt: {
                xs: 10,
                md: 8,
              },
            }}
            p={1}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              lg={12}
              mt={1}
              className="flex gap-5 px-4 justify-center  "
            >
              {spotInfo.map((item, index) => (
                <Button className="flex flex-col" key={index}>
                  {item.icon}
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Button>
              ))}
            </Grid>

            <Grid
              item
              xs={12}
              lg={4}
              className="flex gap-2 justify-center items-center  md:w-full "
            >
              {/* <SocialButtons links={community.links} /> */}
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", bgcolor: colors.card }} pb={0.2}>
            <Tabs value={value} onChange={handleChange} centered>
              {spotTabs.map((spot, index) => (
                <Tab label={spot.name} key={index} />
              ))}
            </Tabs>
          </Box>
        </Box>
        <Box mt={1}>
          {spotTabs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20, display: "none" }}
              animate={{
                opacity: value === item.value ? 1 : 0,
                x: value === item.value ? 0 : -20,
                display: value === item.value ? "block" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              {item.component}
            </motion.div>
          ))}
        </Box>
      </Box>
    );
  } else {
    return <div>loading</div>;
  }
};

export default Page;
