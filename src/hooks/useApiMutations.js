import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const useApiMutation = (method, endpoint, options = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api(method, endpoint, data);
      return response.data;
    },
    ...options,
    onSuccess: (data) => {
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      if (options.redirectTo) {
        navigate(options.redirectTo);
      }
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};

export default useApiMutation;
