"use client";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import { useGetSpots } from "@/utils/hooks/useSpot";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useGetConsoles } from "@/utils/hooks/useConsole";
import { border } from "@/components/helpers/atoms";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
const Spots = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: spots, isLoading } = useGetSpots();
  const { data: consoles } = useGetConsoles();
  const [filteredSpots, setFilteredSpots] = useState(spots || []);

  useEffect(() => {
    setFilteredSpots(spots || []);
  }, [spots]);
  return (
    <Box m={2}>
      <div className="flex justify-between items-center gap-2">
        <Typography variant="h4">Spots</Typography>
        <TextField
          id="spots"
          label="Search..."
          size="small"
          variant="outlined"
          className="w-[150px] "
          onChange={(e) => {
            if (!spots) return;
            const filtered = spots.filter((item) =>
              item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredSpots(filtered);
          }}
        />
      </div>
      <Grid container spacing={1} className="my-2">
        {isLoading ? (
          <p>loading.....</p>
        ) : (
          spots &&
          filteredSpots.map((item, index) => {
            return (
              <Grid
                item
                xs={6}
                p={0.2}
                md={4}
                className="cursor-pointer"
                onClick={() => router.push(`/locations/${item._id}`)}
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
                    <Chip color="secondary" label={item.status} />
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

export default Spots;
