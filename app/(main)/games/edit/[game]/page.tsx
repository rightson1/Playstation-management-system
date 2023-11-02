"use client";
import { useState } from "react";
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
import { useParams } from "next/navigation";
import {
  customToast,
  deleteFile,
  findItemIdByName,
  findItemNameById,
  uploadFile,
} from "@/components/helpers/functions";
import {
  useAddGame,
  useGetSingleGame,
  useUpdateGame,
} from "@/utils/hooks/useGame";
import { useEffect } from "react";
import { useGetConsoles } from "@/utils/hooks/useConsole";
import { useGetConsoleTypes } from "@/utils/hooks/useConsoleType";
const Console = () => {
  const { colors } = useGlobalTheme();
  const { data: consolesFetched } = useGetConsoles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    consoleType: "",
    console: "",
  });
  const { mutateAsync: updateGame } = useUpdateGame();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const params = useParams();
  const id = params.game;
  const { data: fetchedGame, isLoading } = useGetSingleGame(id);
  const { data: consoleTypes } = useGetConsoleTypes();
  useEffect(() => {
    if (!fetchedGame || !consolesFetched || !consoleTypes) return;
    const data = {
      name: fetchedGame.name,
      description: fetchedGame.description || "",
      consoleType:
        consoleTypes.find((item) => item._id === fetchedGame.consoleType?._id)
          ?.name || "",
      console:
        (fetchedGame.console &&
          findItemNameById(fetchedGame.console, consolesFetched)) ||
        "",
    };
    console.log(data);
    setValues(data);
  }, [fetchedGame, consoleTypes, consolesFetched]);
  if (!fetchedGame || !consoleTypes || !consolesFetched)
    return <p>loading...</p>;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = fetchedGame?.image;
    const saveConsole = async () => {
      if (selectedImage) {
        await deleteFile(url);
        url = await uploadFile(selectedImage, `games/${name}`);
      }
      const data = {
        name: values.name,
        consoleType: findItemIdByName(values.consoleType, consoleTypes),
        image: url,
        description: values.description,
        console: findItemIdByName(values.console, consolesFetched),
        _id: fetchedGame._id,
      };
      await updateGame(data);
    };
    customToast({
      userFunction: saveConsole,
      successMessage: "Game Edited Successfully",
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
        <Typography variant="h5">Edit Game</Typography>
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
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Console Type</FormLabel>
          <Select
            label="ConsoleType"
            value={values.consoleType}
            onChange={(e) =>
              setValues({ ...values, consoleType: e.target.value })
            }
            name="consoleType"
            color="info"
            required
          >
            {consoleTypes.map((console) => (
              <MenuItem value={console.name}>{console.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {consolesFetched && (
          <FormControl fullWidth>
            <FormLabel>Console Name</FormLabel>
            <Select
              label="Console"
              value={values.console}
              onChange={(e) =>
                setValues({ ...values, console: e.target.value })
              }
              name="consoleType"
              color="info"
              required
            >
              {consolesFetched.map((console) => (
                <MenuItem value={console.name}>
                  {console.name}-{console.type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
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

export default Console;
