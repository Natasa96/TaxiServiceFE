//import React from 'react';
import { Box, VStack, Link, List, ListItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Sidebar({ userRole }) {
  const adminLinks = [
    { name: "Profile", url: "/profile" },
    { name: "All rides", url: "/rides" },
    { name: "Verify", url: "/drivers" },
  ];

  const userLinks = [
    { name: "Profile", url: "/profile" },
    { name: "Order ride", url: "/create-ride" },
    { name: "Past rides", url: "/history" },
  ];

  const driverLinks = [
    { name: "Profile", url: "/profile" },
    { name: "New ride", url: "/rides" },
    { name: "Past rides", url: "/history" },
  ];

  let linksToDisplay;

  if (userRole === "Admin") linksToDisplay = adminLinks;
  else if (userRole === "Driver") linksToDisplay = driverLinks;
  else linksToDisplay = userLinks;

  return (
    <Box
      bg="gray.700"
      padding="4"
      color="white"
      minH="100vh"
      p={4}
      width="200px"
    >
      <VStack align="start">
        <List spacing={3}>
          {linksToDisplay.map((link) => (
            <ListItem
              key={link.name}
              p={2}
              borderRadius="md"
              _hover={{ bg: "gray.600" }}
            >
              <Link href={link.url}>{link.name}</Link>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

Sidebar.propTypes = {
  userRole: PropTypes.string,
};

export default Sidebar;
