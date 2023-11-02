import { events } from "@/constants";
import React from "react";

export interface childrenProps {
  children: React.ReactNode;
}
export type mode = "light" | "dark";
type Shades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorShades = {
  [key in Shades]: string;
};

export interface TokenColors {
  background: string;
  surface: string;
  foreground: string;
  secondary: string;
  lightBlue: string;
  skyblue: string;
  cream: string;
  borderColor: string;
  active: string;
  white: string;
  indigo: ColorShades;
  green: ColorShades;
  red: ColorShades;
  text: string;
  textSecondary: string;
  card: string;
  black: string;
}
export interface openProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface menuType {
  name: string;
  links: {
    name: string;
    icon: React.JSX.Element;
    info?: string;
    link: string;
  }[];
}
export type EventTypes = (typeof events)[0];

export interface Console {
  name: string;
  type: string;
  image: string;
  spot?: string;
  games?: string[];
  description?: string;
}
export interface ConsoleFetched extends Omit<Console, "type">, Fetched {
  _id: string;
  createdAt: string;
  type: ConsoleTypeFetched;
}
export interface ConsoleEdit extends Console, Fetched {
  _id: string;
  createdAt: string;
}
interface Fetched {
  _id: string;
  createdAt: string;
}
export interface Game {
  name: string;
  consoleType: string;
  image: string;
  console?: string;
  description?: string;
}
export interface GameFetchedPopulated
  extends Omit<Game, "consoleType">,
    Fetched {
  consoleType: ConsoleTypeFetched;
}
export interface GameFetched extends Game, Fetched {}

export interface User {
  displayName: string;
  photoURL?: string;
  email: string;
  uid: string;
}
export interface UserFetched extends User, Fetched {}

export interface ConsoleType {
  name: string;
  rate: number;
}
export interface ConsoleTypeFetched extends ConsoleType, Fetched {}
export interface Spot {
  name: string;
  console: string;
  description?: string;
  image: string;
  status: "Available" | "Unavailable";
}
export interface SpotFetched extends Spot, Fetched {}
export interface SpotPopulated extends Omit<Spot, "console">, Fetched {
  console: ConsoleFetched;
}
