"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetConsoles, useGetSingleConsole } from "@/utils/hooks/useConsole";
const Game = () => {
  const { colors } = useGlobalTheme();
  const params = useParams();
  const id = params.console;
  const { data: fetchedConsole, isLoading } = useGetSingleConsole(id);
  const router = useRouter();
  if (isLoading || !fetchedConsole) return <p>loading...</p>;

  return (
    <Box m={2} bgcolor={colors.foreground} className="flex">
      <Box
        component={"img"}
        src={fetchedConsole.image}
        className="overflow-hidden w-full object-cover h-96"
      ></Box>
      <Box className="w-full " p={2}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => router.push(`/consoles/edit/${id}`)}
        >
          EDIT
        </Button>
        <div className="flex flex-col my-4 gap-4">
          <div>
            <Typography variant="h4">{fetchedConsole.name}</Typography>
            <Typography variant="body2" color="GrayText">
              {fetchedConsole.type?.name}
            </Typography>
          </div>
          <Typography variant="body2">{fetchedConsole.description}</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Game;
