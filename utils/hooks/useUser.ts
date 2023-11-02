import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types";
export const useAddUser = () => {
  return useMutation(
    (user: User): Promise<void> => axios.post("/api/user", user)
  );
};
