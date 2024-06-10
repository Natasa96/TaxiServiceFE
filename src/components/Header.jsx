//import React from 'react';
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box bg="teal.500" color="white" px={4} py={3}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Taxi Service App</Heading>
        <Button onClick={handleLogout} colorScheme="teal" variant="outline">
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
