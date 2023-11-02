import React from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
export const border = () => {
  const { colors } = useGlobalTheme();
  return {
    border: 1 + "!important",
    borderColor: colors.borderColor + "!important",
    bgcolor: colors.secondary + "!important",
  };
};

export const NotificationCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Box className="flex w-full justify-between mt-2 items-center ">
          <div className="cursor-pointer">
            <Typography variant="h4">
              <span className="text-gray-500">From: </span>
              <span className="text-gray-100">John Doe</span>
            </Typography>
          </div>

          <IconButton size="small">
            <ClearIcon color="error" className="text-red-500" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};
