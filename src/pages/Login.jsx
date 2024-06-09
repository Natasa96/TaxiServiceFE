import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
} from "@chakra-ui/react";
import useAuthStore from "../store/auth";
import useAuthMutation from "../hooks/useAuthMutation";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const { setUser, setToken } = useAuthStore();
  const { mutateAsync: loginAsync } = useAuthMutation("post", "/login", {
    // onError: (error) => {
    // setError("apiError", {
    //   type: "manual",
    //   message: error?.response?.data?.message || "Login failed",
    // });
    // },
    onSuccess: (data) => {
      console.log("Login successful ", data);
      setIsAuthenticated(true);
      setToken(data.token);
    },
  });
  const { mutateAsync: getProfileAsync } = useAuthMutation("get", "/me", {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {},
    redirectTo: "/home",
  });

  const onSubmit = async (values) => {
    clearErrors();
    await loginAsync(values);
    await getProfileAsync();
  };

  return (
    <Box
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h1" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors?.username}>
            <FormLabel htmlFor="uesrname">Username</FormLabel>
            <Input
              id="username"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <FormErrorMessage>
              {errors?.username && errors?.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors?.password}>
            <FormLabel htmlFor="password"></FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormErrorMessage>
              {errors?.password && errors?.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="full"
          >
            Login
          </Button>

          {errors.apiError && (
            <p style={{ color: "red" }}>{errors.apiError.message}</p>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
