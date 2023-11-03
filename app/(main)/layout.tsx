"use client";
import React, { useState } from "react";
import { childrenProps } from "@/types";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import CustomSpeedDial from "./components/CustomSpeedDial";
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }: childrenProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const { admin, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!admin) {
      localStorage.setItem("path", pathname);
      router.push("/login");
    }
  }, [admin, user]);
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
