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
  Radio,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
import useAuthMutation from "../hooks/useAuthMutation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState(2);

  const { mutateAsync: registerMutation } = useAuthMutation(
    "post",
    "/register",
    {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error) => {
        setError("authError", {
          message: error.response?.data?.message || "Registration failed",
        });
      },
    }
  );

  const onSubmit = async (values) => {
    clearErrors();
    await registerMutation({ ...values, role: role });
    console.log(values);
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
        Register
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email: </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormLabel htmlFor="name">First name:</FormLabel>
          <Input id="name" placeholder="Name" {...register("name")} />

          <FormLabel htmlFor="surname">Last name:</FormLabel>
          <Input id="surname" placeholder="Surname" {...register("surname")} />

          <FormControl>
            <FormLabel htmlFor="birthday">Birthday:</FormLabel>
            <Input
              id="birthday"
              type="date"
              placeholder="Birthday"
              {...register("birthday", {
                validate: {
                  pastDate: (value) =>
                    new Date(value) < new Date() ||
                    "Birthday must be a past date",
                },
              })}
            />
            <FormErrorMessage>
              {errors.birthday && errors.birthday.message}
            </FormErrorMessage>
          </FormControl>

          <Box p={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="address">Address: </FormLabel>
              <Input
                {...register("address.streetName")}
                placeholder="Street Name"
              />
              <Input
                {...register("address.streetNumber")}
                placeholder="Street Number"
              />
              <Input {...register("address.city")} placeholder="City" />
              <Input {...register("address.zipcode")} placeholder="Zipcode" />
            </FormControl>
          </Box>
          <RadioGroup onChange={setRole} value={role} colorScheme="teal">
            <Stack direction="row" spacing={5}>
              <Radio value={1}> Driver</Radio>
              <Radio value={2}>Passenger</Radio>
            </Stack>
          </RadioGroup>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="full"
          >
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
