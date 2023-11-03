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
import { customToast, deleteFile } from "@/components/helpers/functions";
import { useUpdateUser } from "@/utils/hooks/useUser";
import { useAuth } from "@/utils/AuthContext";
import { useUpdateSession } from "@/utils/hooks/useSession";
import axios from "axios";

const Console = () => {
  const { colors } = useGlobalTheme();
  const { user, fetchUser } = useAuth();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [sessionCode, setSessionCode] = useState(user?.sessionCode || "");
  const { mutateAsync: updateSession } = useUpdateSession();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    const code = e.currentTarget.code.value;
    const saveConsole = async () => {
      const session = await axios
        .get(`/api/sessions?code=${code}`)
        .then((res) => res.data);
      if (session) {
        await axios.put(`/api/sessions/players`, {
          _id: session._id,
          player: user._id,
        });
        await updateUser({
          _id: user._id,
          sessionCode: code,
        });
        await fetchUser(user.uid);
      } else {
        throw new Error("Invalid code");
      }
    };
    customToast({
      userFunction: saveConsole,
      successMessage: "Game added",
      errorMessage: "Something went wrong",
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
          <FormLabel>Code</FormLabel>
          <TextField
            label="Code"
            variant="outlined"
            size="small"
            color="primary"
            name="code"
            required
            multiline
            rows={3}
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
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
