import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { openProps } from "@/types";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import { Divider, InputBase } from "@mui/material";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 2,
};

export default function PageSearch({ open, setOpen }: openProps) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useHotkeys("s", () => setOpen(true), [open]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="br w-[90%] sm:w-[500px]">
          <Box className="fb">
            <Box className="flex gap-1 items-center">
              <SearchIcon />
              <InputBase placeholder="Search...." />
            </Box>
            <Chip label="esc" variant="outlined" size="small" />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
