import { Box, Text, VStack, Link, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

const Profile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();
  return (
    <Layout>
      <Box>
        <Heading as="h1" mb={6} textAlign="center">
          Profile
        </Heading>
        <form>
          <VStack align="center">
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Username"
                {...register("username", {
                  require: "Username is required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel></FormLabel>
            </FormControl>
          </VStack>
        </form>
      </Box>
    </Layout>
  );
};

export default Profile;
