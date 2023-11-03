"use client";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  customToast,
  deleteFile,
  useDeleteNotification,
} from "@/components/helpers/functions";
import { useUpdateUser } from "@/utils/hooks/useUser";
import { useAuth } from "@/utils/AuthContext";
import {
  useGetSessionByCode,
  useUpdateSession,
} from "@/utils/hooks/useSession";
import axios from "axios";
import { Notification } from "@/types";
import toast from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useGetSpots } from "@/utils/hooks/useSpot";
const Console = () => {
  const { colors } = useGlobalTheme();
  const { user, fetchUser } = useAuth();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [message, setMessage] = useState("");
  const { data: session } = useGetSessionByCode(user?.sessionCode);
  const { mutateAsync: updateSession } = useUpdateSession();
  const { data: spots } = useGetSpots();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return toast.error("Session not found");
    const message = e.currentTarget.message.value;

    const data: Notification = {
      message,
      createdAt: new Date().toISOString(),
      sessionId: session._id,
      id: "",
      read: false,
      senderId: user?._id,
      senderName: user?.displayName,
      spot:
        spots?.find((item) => item._id === session.spot)?.name || session.spot,
    };
    setMessage("");
    const update = async () => {
      await addDoc(collection(db, "notifications"), data);
    };
    customToast({
      userFunction: update,
      successMessage: "Notification sent",
    });
  };

  return (
    <Box
      m={1}
      bgcolor={colors.surface}
      p={1}
      mb={20}
      onSubmit={submit}
      component={"form"}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Send Notification</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Message</FormLabel>
          <TextField
            label="Message"
            variant="outlined"
            size="small"
            color="primary"
            name="message"
            required
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>

        <div className="w-full flex justify-end">
          <Button variant="contained" type="submit" startIcon={<AddIcon />}>
            Save
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default Console;
