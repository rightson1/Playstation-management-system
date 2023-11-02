"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { customToast } from "@/components/helpers/functions";
import { User } from "@/types";
import axios from "axios";
import { useAddUser } from "@/utils/hooks/useUser";
const Login = () => {
  const { colors } = useGlobalTheme();
  const { mutateAsync } = useAddUser();
  const provider = new GoogleAuthProvider();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    if (!email || !password) return;
    const signIn = async () => {
      await signInWithEmailAndPassword(auth, email, password);
    };
    customToast({
      userFunction: signIn,
      successMessage: "Signed in successfully",
      errorMessage: "Something went wrong",
      successFunc: () => (window.location.href = "/"),
    });
  };

  const signInWithGoogle = async () => {
    const signIn = async () =>
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const { displayName, email, uid, photoURL } = result.user;
          if (displayName && email && uid) {
            await mutateAsync({
              displayName,
              email,
              uid,
              photoURL: photoURL || "",
            });
          } else {
            throw new Error("Could not sign in");
          }
        })
        .then(() => {
          window.location.href = "/user";
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    toast.promise(signIn(), {
      loading: "Signing in...",
      success: "Signed in successfully",
      error: "Could not sign in",
    });
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={8}
        bgcolor={colors.foreground}
        className="h-screen hidden md:flex  overflow-hidden relative"
      >
        <div className="absolute top-5 left-5">
          <img src="/logo.svg" alt="" />
        </div>
        <img src="/login.svg" alt="" />
      </Grid>
      <Grid
        item
        xs={12}
        p={2}
        md={4}
        className="h-screen flex flex-col
         items-center justify-center overflow-hidden relative"
      >
        <form
          onSubmit={submit}
          className="flex gap-5 flex-col items-start justify-center w-full max-w-[500px]"
        >
          {" "}
          <Typography variant="h2">Welcome to Modernize</Typography>
          <Typography color="GrayText" variant="h6">
            Your Admin Dashboard
          </Typography>
          <Button
            startIcon={<GoogleIcon />}
            className="w-full"
            variant="outlined"
            type="button"
            onClick={signInWithGoogle}
            color="success"
          >
            Sign In with Google
          </Button>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField name="email" required label="Email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              name="password"
              required
              label="Password"
              type="password"
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{
                mt: 3,
              }}
            >
              Sign In
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
