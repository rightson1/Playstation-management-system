"use client";
import React, { useState } from "react";
import { childrenProps } from "@/types";
import Rightbar from "@/app/(main)/components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import UserNav from "../(main)/components/User/UserNav";
import UserSide from "../(main)/components/User/UserSide";

const Layout = ({ children }: childrenProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box>
      <UserSide {...{ open, setOpen }} />
      <UserNav {...{ open, setOpen }} />
      <Box
        sx={{
          mt: "70px",
          ml: screenWidth ? "220px" : 0,
          mr: screenWidth ? "240px" : 0,
        }}
      >
        {children}
      </Box>
      <Rightbar />
    </Box>
  );
};

export default Layout;
