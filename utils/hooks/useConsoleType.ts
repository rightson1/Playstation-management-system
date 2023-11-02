import { ConsoleType, ConsoleTypeFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddConsoleType = () => {
  return useMutation((event: ConsoleType) =>
    axios.post(`/api/console-type`, event)
  );
};
export const useGetConsoleTypes = () => {
  return useQuery(
    ["consoleTypes"],
    (): Promise<ConsoleTypeFetched[]> =>
      axios.get("/api/console-type").then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useGetSingleConsoleType = (id: string) => {
  return useQuery(
    ["consoleTypes", id],
    (): Promise<ConsoleTypeFetched> =>
      axios.get(`/api/console-type/single?id=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useUpdateConsoleType = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<ConsoleTypeFetched>) =>
      axios.put(`/api/console-type`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["consoleTypes"]);
        toast.success("ConsoleType updated");
      },
    }
  );
};
