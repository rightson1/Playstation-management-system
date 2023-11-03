import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useGlobalTheme } from "@/utils/themeContext";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NotificationCard } from "../helpers/atoms";
import { Session, SessionFetched, SpotPopulated } from "@/types";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useAddSession,
  useGetSingleSession,
  useUpdateSession,
} from "@/utils/hooks/useSession";
import { useUpdateSpot } from "@/utils/hooks/useSpot";
import { customToast } from "../helpers/functions";
import { useGetConsoleTypes } from "@/utils/hooks/useConsoleType";
const Profile = ({
  spot,
  player,
}: {
  spot: SpotPopulated;
  player: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync: addSession } = useAddSession();
  const { mutateAsync: editSpot } = useUpdateSpot();
  const [sessionOpen, setSessionOpen] = React.useState(false);
  const { data: session } = useGetSingleSession(spot._id);
  const { data: consoleTypes } = useGetConsoleTypes();
  const [discount, setDiscount] = React.useState(0);
  const [rate, setRate] = React.useState(0);
  const { mutateAsync: editSession } = useUpdateSession();
  useEffect(() => {
    if (consoleTypes && spot.console) {
      const consoleType = consoleTypes.find((consoleType) => {
        return consoleType._id === spot.console.type;
      });

      setRate(consoleType?.rate ? consoleType?.rate / 60 : 0);
    }
  }, [consoleTypes, session]);

  function calculateTimeDifferenceInMinutes(providedTimestamp: Date): number {
    const currentTime = new Date();
    const timeDifferenceInMilliseconds =
      currentTime.getTime() - providedTimestamp.getTime();
    const timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60)
    );
    return timeDifferenceInMinutes;
  }

  useEffect(() => {
    if (session) {
      setSessionOpen(true);
    }
  }, [session]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    const data: Session = {
      spot: spot._id,
      console: spot.console._id,
      status: "current",
      code: Math.floor(1000 + Math.random() * 9000).toString(),
      players: [],
      amount: 0,
      discount: 0,
      startTime: new Date(),
    };
    const update = async () => {
      await addSession(data);
      await editSpot({ status: "Unavailable", _id: spot._id });
      setSessionOpen(true);
    };
    customToast({
      userFunction: update,
      successMessage: "Session Started",
      errorMessage: "Error Starting Session",
      errorFunc: async () => {
        setSessionOpen(false);
        await editSpot({ status: "Available", _id: spot._id });
      },
    });
  };
  const completeSession = () => {
    if (!session) return null;
    const data: Partial<SessionFetched> = {
      _id: session._id,
      status: "completed",
      endTime: new Date(),
      discount: discount,
      amount:
        Math.floor(
          calculateTimeDifferenceInMinutes(new Date(session?.startTime)) * rate
        ) - discount,
    };
    const update = async () => {
      await editSession(data);
      await editSpot({ status: "Available", _id: spot._id });
      setSessionOpen(false);
    };
    customToast({
      userFunction: update,
      successMessage: "Session Completed",
      errorMessage: "Error Completing Session",
      errorFunc: async () => {
        setSessionOpen(true);
        await editSpot({ status: "Unavailable", _id: spot._id });
      },
    });
  };
  const cancelSession = () => {
    if (!session) return null;
    const data: Partial<SessionFetched> = {
      _id: session._id,
      status: "cancelled",
      endTime: new Date(),
    };
    const update = async () => {
      await editSession(data);
      await editSpot({ status: "Available", _id: spot._id });
      setSessionOpen(false);
    };
    customToast({
      userFunction: update,
      successMessage: "Session Cancelled",
      errorMessage: "Error Cancelling Session",
      errorFunc: async () => {
        setSessionOpen(true);
        await editSpot({ status: "Unavailable", _id: spot._id });
      },
    });
  };

  const { colors } = useGlobalTheme();
  function Play() {
    if (!session) return null;
    return (
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant="h5">Current Session</DialogTitle>
          <DialogContent>
            <div className="space-y-4">
              <div>
                <Typography variant="h6">Code</Typography>
                <Typography variant="body2" className="flex">
                  {session.code}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Start Time:</Typography>{" "}
                <Typography variant="body2" className="flex">
                  {new Date(session.startTime).toLocaleString()}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">End Time:</Typography>{" "}
                <Typography variant="body2" className="flex">
                  {session.endTime
                    ? new Date(session.endTime).toLocaleString()
                    : "Not yet completed"}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Amount:</Typography>
                <Typography variant="body2">
                  Ksh{" "}
                  {Math.floor(
                    calculateTimeDifferenceInMinutes(
                      new Date(session?.startTime)
                    ) * rate
                  )}
                </Typography>
              </div>
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Discount"
                  type="discount"
                  fullWidth
                  variant="standard"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value))}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={cancelSession}
              disabled={player}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={completeSession}
              disabled={player}
            >
              Complete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  return (
    <Grid bgcolor={colors.foreground} spacing={1} p={1}>
      <Grid item xs={12} md={6} className="flex flex-col  gap-3 pb-20">
        <Typography variant="h4">Stats</Typography>
        <Typography>{spot.description || spot.console.description}</Typography>

        <div className="flex justify-end gap-5">
          {sessionOpen ? (
            <Button variant="contained" onClick={handleClickOpen}>
              Session Modal
            </Button>
          ) : (
            <Button
              disabled={player}
              variant="outlined"
              color="secondary"
              onClick={submit}
            >
              Start Session
            </Button>
          )}
        </div>
        <Play />
      </Grid>

      <Grid item xs={12} md={6} className="flex flex-col gap-2">
        <Typography variant="h4">Notifications</Typography>
        <NotificationCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
