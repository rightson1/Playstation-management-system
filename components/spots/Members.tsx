import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Members = () => {
  return (
    <Box>
      <Box className="fx-between">
        <Typography variant="h5">Members</Typography>
        <Button variant="contained">Add</Button>
      </Box>
    </Box>
  );
};

export default Members;
