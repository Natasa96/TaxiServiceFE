import { Text, ListIcon, Box, VStack, HStack, Button } from "@chakra-ui/react";
import {
  MdPerson,
  MdVerified,
  MdCancel,
  MdSettings,
  MdBlock,
  MdBarChart,
} from "react-icons/md";
import PropTypes from "prop-types";

const DriverCard = ({ driver, onChangeVerification, onChangeBlock }) => {
  if (driver == null) {
    <>-</>;
  }
  const { fullName, verificationState, rating } = driver;

  const renderVerificationState = (state) => {
    switch (state) {
      case "Approved":
        return (
          <HStack>
            <ListIcon as={MdVerified} color="green.500" />
            <Text fontSize="m">Verification:</Text>
            <Text>Approved</Text>
          </HStack>
        );
      case "Processing":
        return (
          <HStack>
            <ListIcon as={MdSettings} color="green.500" />
            <Text fontSize="m">Verification:</Text>
            <Text>Processing</Text>
          </HStack>
        );
      case "Blocked":
        return (
          <HStack>
            <ListIcon as={MdBlock} color="green.500" />
            <Text fontSize="m">Verification:</Text>
            <Text>Blocked</Text>
          </HStack>
        );
      case "Declined":
        return (
          <HStack>
            <ListIcon as={MdCancel} color="green.500" />
            <Text fontSize="m">Verification:</Text>
            <Text>Declined</Text>
          </HStack>
        );
      default:
        return null;
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} shadow="md">
      <VStack align="start" spacing={2}>
        <HStack>
          <ListIcon as={MdPerson} color="green.500" />
          <Text fontSize="l" fontWeight="bold">
            {fullName}
          </Text>
        </HStack>
        <HStack>
          <ListIcon as={MdBarChart} color="green.500" />
          <Text fontSize="m">
            Rating:
            {rating}
          </Text>
        </HStack>
        <HStack>{renderVerificationState(verificationState)}</HStack>
      </VStack>
      <HStack style={{ gap: 8 }}>
        <Button
          variant="solid"
          onClick={() => onChangeVerification(driver)}
          disabled={verificationState === "Approved" ? true : false}
          isDisabled={verificationState === "Approved" ? true : false}
        >
          Verify
        </Button>
        <Button
          variant="outline"
          onClick={() => onChangeBlock(driver)}
          disabled={verificationState === "Blocked" ? true : false}
          isDisabled={verificationState === "Blocked" ? true : false}
        >
          Block
        </Button>
      </HStack>
    </Box>
  );
};

DriverCard.propTypes = {
  driver: PropTypes.node.isRequired,
  onChangeVerification: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default DriverCard;
