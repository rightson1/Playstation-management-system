"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetGames, useGetSingleGame } from "@/utils/hooks/useGame";

const Game = () => {
  const { colors } = useGlobalTheme();
  const params = useParams();
  const id = params.game;

  const { data: fetchedGame, isLoading } = useGetSingleGame(id);
  const router = useRouter();
  if (isLoading || !fetchedGame) return <p>loading...</p>;
  console.log(fetchedGame);
  return (
    <Box m={2} bgcolor={colors.foreground} className="flex">
      <Box
        component={"img"}
        src={fetchedGame.image}
        className="overflow-hidden w-full object-cover h-96"
      ></Box>
      <Box className="w-full " p={2}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => router.push(`/games/edit/${id}`)}
        >
          EDIT
        </Button>
        <div className="flex flex-col my-4 gap-4">
          <div>
            <Typography variant="h4">{fetchedGame.name}</Typography>
            <Typography variant="body2" color="GrayText">
              {fetchedGame.consoleType.name}
            </Typography>
          </div>
          <Typography variant="body2">{fetchedGame.description}</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Game;
