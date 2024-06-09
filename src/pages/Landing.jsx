import {
  Box,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { Link as ChakraLink, Button } from "@chakra-ui/react";
import { FaTaxi } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Landing = () => {
  return (
    <VStack>
      <Box
        mx="auto"
        mt={8}
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
      >
        <Icon as={FaTaxi} boxSize={24} color="teal.500" />
        <Heading as="h1" size="2xl" marginTop={4} color="teal.500">
          Welcome to Taxi Service
        </Heading>
      </Box>

      <Flex>
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="teal"
          size="lg"
          marginRight={4}
        >
          Login
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="teal" size="lg">
          Register
        </Button>
      </Flex>
      {/* <Grid
        templateColumns="repeat(2, 1fr)"
        height="100vh"
        width="100vw"
        gap={4}
        p={4}
      >
        <GridItem pl="8" bg="teal" alignContent="center">
          <FormLabel>Go to Login</FormLabel>
          <ChakraLink as={RouterLink} to="login">
            <Button mt={4} colorScheme="teal" width="full" borderRadius="md">
              Login
            </Button>
          </ChakraLink>
        </GridItem>
        <GridItem templ="8" bg="gray.200" alignContent="center">
          <FormLabel>Go to Rigistration</FormLabel>
          <ChakraLink as={RouterLink} to="/register">
            <Button mt={4} colorScheme="teal" width="full">
              Register
            </Button>
          </ChakraLink>
        </GridItem>
      </Grid> */}
    </VStack>
  );
};

export default Landing;
