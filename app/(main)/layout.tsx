"use client";
import React, { useState } from "react";
import { childrenProps } from "@/types";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import CustomSpeedDial from "./components/CustomSpeedDial";

const Layout = ({ children }: childrenProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box>
      <Sidebar {...{ open, setOpen }} />
      <Navbar {...{ open, setOpen }} />

      <Box
        sx={{
          mt: "70px",
          ml: screenWidth ? "220px" : 0,
          mr: screenWidth ? "240px" : 0,
        }}
      >
        {children}
      </Box>
      <CustomSpeedDial />
      <Rightbar />
    </Box>
  );
};

export default Layout;
