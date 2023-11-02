import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useRouter } from "next/navigation";
import RoomIcon from "@mui/icons-material/Room";
import GamepadIcon from "@mui/icons-material/Gamepad";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CasinoIcon from "@mui/icons-material/Casino";
const actions = [
  {
    name: "New Gamming Spot",
    icon: <RoomIcon />,
    link: "/spot",
  },
  {
    name: "New Game",
    icon: <GamepadIcon />,
    link: "/game",
  },
  {
    name: "New Console Type",
    icon: <CasinoIcon />,
    link: "/console-type",
  },

  {
    name: "New Console",
    icon: <VideogameAssetIcon />,
    link: "/console",
  },
];
export default function CustomSpeedDial() {
  const router = useRouter();
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      className="fixed bottom-[53px] md:bottom-5 right-3 md:right-[250px] z-[100000]"
      sx={{
        position: "fixed !important",
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={() => router.push(`/create/${action.link}`)}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
