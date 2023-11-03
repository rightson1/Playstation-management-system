"use client";
import {
  useGetConsoleTypes,
  useUpdateConsoleType,
} from "@/utils/hooks/useConsoleType";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ConsoleTypeFetched } from "@/types";
import { set } from "mongoose";
import { customToast } from "@/components/helpers/functions";
import toast from "react-hot-toast";
const ConsoleTypes = () => {
  const { data: consoleTypes } = useGetConsoleTypes();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const { mutateAsync: editConsoleType } = useUpdateConsoleType();
  const [activeConsoleType, setActiveConsoleType] =
    React.useState<ConsoleTypeFetched | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActiveConsoleType(null);
  };
  useEffect(() => {
    if (activeConsoleType) {
      setName(activeConsoleType.name);
      setRate(activeConsoleType.rate);
    }
  }, [activeConsoleType]);
  const submit = () => {
    if (!activeConsoleType) {
      return toast.error("Something went wrong");
    }
    const update = async () => {
      await editConsoleType({
        _id: activeConsoleType._id,
        name,
        rate,
      });
    };
    handleClose();
    customToast({
      userFunction: update,
      successMessage: "Console type updated",
      errorMessage: "Something went wrong",
    });
  };

  function Play() {
    return (
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant="h5">Edit {activeConsoleType?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText className="flex flex-col gap-2">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="rate"
                label="Rate"
                type="number"
                fullWidth
                value={rate}
                onChange={(e) => {
                  setRate(Number(e.target.value));
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  return (
    <Box m={1} py={1}>
      <Typography variant="h5" m={1}>
        Console Types
      </Typography>

      <Grid container my={2}>
        {consoleTypes?.map((consoleType) => {
          return (
            <Grid item xs={12} md={4} lg={4} key={consoleType._id} m={1}>
              <Card>
                <CardContent className="flex flex-col gap-1">
                  <Typography variant="h5" component="div">
                    {consoleType.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Rate: {consoleType.rate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setActiveConsoleType(consoleType);
                      handleClickOpen();
                    }}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Play />
    </Box>
  );
};

export default ConsoleTypes;
