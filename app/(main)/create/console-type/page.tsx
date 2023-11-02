"use client";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAddConsoleType } from "@/utils/hooks/useConsoleType";
import { customToast } from "@/components/helpers/functions";
const ConsoleType = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addConsoleType } = useAddConsoleType();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim();
    const rate = data.get("rate")?.toString();
    const formElement = e.currentTarget as HTMLFormElement; //
    formElement.reset();
    if (!name || !rate) return;
    const saveConsoleType = async () => {
      await addConsoleType({
        name,
        rate: Number(rate),
      });
    };
    customToast({
      userFunction: saveConsoleType,
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
        <Typography variant="h5">New Game</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            color="primary"
            name="name"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Rate</FormLabel>
          <TextField
            label="Rate/hour"
            variant="outlined"
            size="small"
            color="primary"
            name="rate"
            required
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

export default ConsoleType;
