import { Spot, SpotFetched, SpotPopulated } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSpot = () => {
  return useMutation((event: Spot) => axios.post(`/api/spots`, event));
};
export const useGetSpots = () => {
  return useQuery(
    ["spots"],
    (): Promise<SpotPopulated[]> =>
      axios.get("/api/spots").then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useGetSingleSpot = (id: string) => {
  return useQuery(
    ["spots", id],
    (): Promise<SpotPopulated> =>
      axios.get(`/api/spots/single?id=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useUpdateSpot = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<SpotFetched>) => axios.put(`/api/spots`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["spots"]);
      },
    }
  );
};
