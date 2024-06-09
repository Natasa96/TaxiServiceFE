import { Spinner, Box, Center } from "@chakra-ui/react";
import { useResourceQuery } from "../hooks/useResourceQuery";
import PropTypes from "prop-types";

const ResourceContainer = ({ method, url, queryKey, children }) => {
  const { error, isLoading } = useResourceQuery(method, url, queryKey);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box p={5} shadow="md" borderWidth="1px">
        <p>Error faching data!</p>
      </Box>
    );
  }

  return children;
};

ResourceContainer.propTypes = {
  method: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ResourceContainer;
