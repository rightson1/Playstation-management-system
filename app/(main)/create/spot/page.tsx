"use client";
import { ReactElement, use, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ImageField } from "@/components/helpers/inputs";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAddSpot } from "@/utils/hooks/useSpot";
import { useGetConsoles } from "@/utils/hooks/useConsole";
import { ConsoleFetched, Spot } from "@/types";
import { useEffect } from "react";
import {
  customToast,
  deleteFile,
  uploadFile,
} from "@/components/helpers/functions";
const SpotPage = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addSpot } = useAddSpot();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { data: consoles } = useGetConsoles();
  const [consoleFetched, setConsoleFetched] = useState<ConsoleFetched[]>([]);
  useEffect(() => {
    if (consoles) {
      setConsoleFetched(consoles);
    }
  }, [consoles]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = "";
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim();
    const consoleName = data.get("console")?.toString().trim();
    const description = data.get("description")?.toString().trim();
    if (!name || !consoleName || !selectedImage) return;

    const saveConsole = async () => {
      url = await uploadFile(selectedImage, `spots/${name}`);
      const payload: Spot = {
        name,
        console: consoleName,
        image: url,
        description,
        status: "Available",
      };
      await addSpot(payload);
    };
    customToast({
      userFunction: saveConsole,
      successMessage: "Spot added",
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
        <Typography variant="h5">New Spot</Typography>
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
          <Select label="Console" name="console" color="info" required>
            {consoles?.map((console) => (
              <MenuItem value={console._id}>{console.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          <TextField
            label="description"
            variant="outlined"
            size="small"
            color="primary"
            name="description"
            // required
            multiline
            rows={5}
          />
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

export default SpotPage;
