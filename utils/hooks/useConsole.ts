import { Console, ConsoleEdit, ConsoleFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddConsole = () => {
  return useMutation((event: Console) => axios.post(`/api/consoles`, event));
};
export const useGetConsoles = () => {
  return useQuery(
    ["consoles"],
    (): Promise<ConsoleFetched[]> =>
      axios.get("/api/consoles").then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useGetSingleConsole = (id: string) => {
  return useQuery(
    ["consoles", id],
    (): Promise<ConsoleFetched> =>
      axios.get(`/api/consoles/single?id=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useUpdateConsole = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<ConsoleEdit>) => axios.put(`/api/consoles`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["consoles"]);
      },
    }
  );
};
