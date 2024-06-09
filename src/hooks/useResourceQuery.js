import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useData } from "../context/DataContext";

export const useResourceQuery = (method, endpoint, queryKey, options = {}) => {
  const { setData } = useData();

  return useQuery({
    queryKey: [queryKey],
    queryFn: async (data) => {
      const response = await api(method, endpoint, data);
      await setData({ [queryKey]: response.data, ...data });
      return response.data;
    },
    ...options,
  });
};
