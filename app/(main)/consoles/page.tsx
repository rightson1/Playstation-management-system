"use client";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useRouter } from "next/navigation";
import { useGetConsoles } from "@/utils/hooks/useConsole";
const Consoles = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: consoles, isLoading } = useGetConsoles();
  const [filteredConsoles, setFilteredConsoles] = useState(consoles || []);
  useEffect(() => {
    setFilteredConsoles(consoles || []);
  }, [consoles]);
  return (
    <Box m={2}>
      <div className="flex justify-between items-center gap-2">
        <Typography variant="h4">Consoles</Typography>
        <TextField
          id="spots"
          label="Search..."
          size="small"
          variant="outlined"
          className="w-[150px] "
          onChange={(e) => {
            if (!consoles) return;
            const filtered = consoles.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                item.type.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
            );
            setFilteredConsoles(filtered);
          }}
        />
      </div>
      <Grid container spacing={1} className="my-2">
        {isLoading ? (
          <p>loading.....</p>
        ) : (
          consoles &&
          filteredConsoles.map((item, index) => {
            return (
              <Grid
                item
                xs={6}
                p={0.2}
                md={4}
                onClick={() => router.push(`/consoles/${item._id}`)}
              >
                <Box
                  border={1}
                  borderColor={colors.borderColor}
                  bgcolor={colors.secondary}
                  sx={{
                    "&:hover": {
                      borderColor: colors.foreground,
                    },
                  }}
                  className="
              w-full p-1 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Box
                    src={item.image}
                    className="
              w-full h-[200px] object-cover
              "
                    component="img"
                  />
                  <div className="flex flex-col pb-5 gap-1">
                    <Typography variant="h5">{item.name} </Typography>
                    <Typography variant="body2">
                      {item.type?.name || ""}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Consoles;
