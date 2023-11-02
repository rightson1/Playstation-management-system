import { Game, GameFetched, GameFetchedPopulated } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddGame = () => {
  return useMutation((event: Game) => axios.post(`/api/games`, event));
};
export const useGetGames = () => {
  return useQuery(
    ["games"],
    (): Promise<GameFetchedPopulated[]> =>
      axios.get("/api/games").then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useGetSingleGame = (id: string) => {
  return useQuery(
    ["games", id],
    (): Promise<GameFetchedPopulated> =>
      axios.get(`/api/games/single?id=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<GameFetched>) => axios.put(`/api/games`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["games"]);
      },
    }
  );
};
