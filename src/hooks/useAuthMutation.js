import { useMutation } from "@tanstack/react-query";
import auth from "../services/auth";
import { useNavigate } from "react-router-dom";

const useAuthMutation = (method, endpoint, options = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => auth(method, endpoint, data),
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
      return error;
    },
  });
};

export default useAuthMutation;
