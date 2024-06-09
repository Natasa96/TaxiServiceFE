import { useMutation } from "@tanstack/react-query";
import auth from "../services/auth";
import useAuthStore from "../store/auth";

const useLogin = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data) => auth("post", "/login", data),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
    },
    onError: (error) => {
      console.error("Failed to login: ", error);
    },
  });
};

export default useLogin;
