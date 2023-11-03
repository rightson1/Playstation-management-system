import { Session, SessionFetched, SessionPopulated } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSession = () => {
  const queryClient = useQueryClient();
  return useMutation((event: Session) => axios.post(`/api/sessions`, event), {
    onSuccess: () => {
      queryClient.invalidateQueries(["sessions"]);
    },
  });
};

export const useGetSingleSession = (id?: string) => {
  return useQuery(
    ["sessions", id],
    (): Promise<SessionFetched> =>
      axios.get(`/api/sessions?id=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
      enabled: !!id,
    }
  );
};
export const useGetSessionMembers = (id?: string) => {
  return useQuery(
    ["sessionMembers", id],
    (): Promise<SessionPopulated> =>
      axios.get(`/api/sessions?id=${id}`).then((res) => res.data),
    {
      enabled: !!id,
      refetchOnMount: true,
    }
  );
};
export const useGetSessionByCode = (id?: string) => {
  return useQuery(
    ["sessions", id],
    (): Promise<SessionFetched> =>
      axios.get(`/api/sessions?code=${id}`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
      enabled: !!id,
    }
  );
};
export const useGetEarningsGrid = () => {
  return useQuery(
    ["earnings"],
    (): Promise<SessionFetched[]> =>
      axios.get(`/api/sessions/earnings`).then((res) => res.data),
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<SessionFetched>) => axios.put(`/api/sessions`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sessions"]);
      },
    }
  );
};
