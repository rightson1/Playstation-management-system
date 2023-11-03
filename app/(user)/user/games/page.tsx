"use client";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import { useGetGames } from "@/utils/hooks/useGame";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useGetConsoles } from "@/utils/hooks/useConsole";
import Chip from "@mui/material/Chip";
import { border } from "@/components/helpers/atoms";
const Games = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: games, isLoading } = useGetGames();
  const { data: consoles } = useGetConsoles();
  const [filteredGames, setFilteredGames] = useState(games || []);

  useEffect(() => {
    setFilteredGames(games || []);
  }, [games]);
  return (
    <Box m={2}>
      <div className="flex justify-between items-center gap-2">
        <Typography variant="h4">Games</Typography>
        <TextField
          id="spots"
          label="Search..."
          size="small"
          variant="outlined"
          className="w-[150px] "
          onChange={(e) => {
            if (!games) return;
            const filtered = games.filter((item) =>
              item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredGames(filtered);
          }}
        />
      </div>
      <Grid container spacing={1} className="my-2">
        {isLoading ? (
          <p>loading.....</p>
        ) : (
          games &&
          filteredGames.map((item, index) => {
            return (
              <Grid
                item
                xs={6}
                p={0.2}
                md={4}
                className="cursor-pointer"
                onClick={() => router.push(`/games/${item._id}`)}
              >
                <Card
                  sx={{
                    ...border(),
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="140"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Chip
                      color="secondary"
                      label={
                        consoles?.find(
                          (console) => console._id === item.console
                        )?.name || "No console"
                      }
                    />
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Games;
