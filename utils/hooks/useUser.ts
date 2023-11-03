import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User, UserFetched } from "@/types";
export const useAddUser = () => {
  return useMutation(
    (user: User): Promise<void> => axios.post("/api/user", user)
  );
};
export const useUpdateUser = () => {
  return useMutation((user: Partial<UserFetched>) =>
    axios.put(`/api/user`, user)
  );
};
