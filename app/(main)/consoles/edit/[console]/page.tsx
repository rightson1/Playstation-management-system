"use client";
import { ReactElement, useEffect, useState } from "react";
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
import { useUpdateConsole } from "@/utils/hooks/useConsole";
import {
  customToast,
  deleteFile,
  uploadFile,
} from "@/components/helpers/functions";
import { useGetSingleConsole } from "@/utils/hooks/useConsole";
import { useParams } from "next/navigation";
import { useGetConsoleTypes } from "@/utils/hooks/useConsoleType";
import { getRandomValues } from "crypto";
const Console = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync: addConsole } = useUpdateConsole();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const params = useParams();
  const id = params.console;
  const { data: consoleTypes } = useGetConsoleTypes();
  const { data: fetchedConsole, isLoading } = useGetSingleConsole(id);
  const [values, setValues] = useState({
    name: "",
    description: "",
    type: "",
  });
  useEffect(() => {
    if (!fetchedConsole || !consoleTypes) return;
    setValues({
      name: fetchedConsole.name,
      description: fetchedConsole.description || "",
      type: fetchedConsole.type?._id || "",
    });
  }, [fetchedConsole]);
  if (isLoading || !fetchedConsole) return <p>loading...</p>;
  if (fetchedConsole) {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let url = fetchedConsole?.image;
      const saveConsole = async () => {
        if (selectedImage) {
          await deleteFile(url);
          url = await uploadFile(selectedImage, `consoles/${name}`);
        }

        await addConsole({
          name: values.name,
          type: values.type,
          image: url,
          description: values.description,
          _id: id,
        });
      };
      customToast({
        userFunction: saveConsole,
        successMessage: "Console Edits",
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
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              // required
            />
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
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Type</FormLabel>
            <Select
              label="Type"
              name="type"
              color="info"
              required
              value={values.type}
              onChange={(e) =>
                setValues({ ...values, type: e.target.value as string })
              }
            >
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
  }
};

export default Console;
