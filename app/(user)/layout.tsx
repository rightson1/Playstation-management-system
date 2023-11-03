"use client";
import React, { useState } from "react";
import { childrenProps } from "@/types";
import Rightbar from "@/app/(main)/components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import UserNav from "../(main)/components/User/UserNav";
import UserSide from "../(main)/components/User/UserSide";
import UserRight from "../(main)/components/UserRight";
import { useAuth } from "@/utils/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
      <UserRight />
    </Box>
  );
};

export default Layout;
