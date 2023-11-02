"use client";
import { ReactElement, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { consoles } from "@/constants";
import MenuItem from "@mui/material/MenuItem";
import { ImageField } from "@/components/helpers/inputs";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAddConsole } from "@/utils/hooks/useConsole";
import {
  customToast,
  deleteFile,
  uploadFile,
} from "@/components/helpers/functions";
import { useGetConsoleTypes } from "@/utils/hooks/useConsoleType";
import toast from "react-hot-toast";
const Console = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addConsole } = useAddConsole();
  const { data: consoleTypes } = useGetConsoleTypes();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim();
    const type = data.get("consoleType")?.toString().trim();

    if (!name || !type || !selectedImage) {
      return toast.error("Please fill all the fields");
    }

    const saveConsole = async () => {
      url = await uploadFile(selectedImage, `consoles/${name}`);
      await addConsole({
        name,
        type,
        image: url,
      });
    };
    customToast({
      userFunction: saveConsole,
      successMessage: "Console added",
      errorMessage: "Something went wrong",
      errorFunc: async () => await deleteFile(url),
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
        <Typography variant="h5">New Console</Typography>
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
          <FormLabel>Console</FormLabel>
          <Select label="ConsoleType" name="consoleType" color="info" required>
            {consoleTypes?.map((console) => (
              <MenuItem value={console._id}>{console.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Cover Image</FormLabel>
          <ImageField
            {...{
              selectedImage: selectedImage,
              setSelectedImage: setSelectedImage,
              name: "cover-image",
            }}
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
