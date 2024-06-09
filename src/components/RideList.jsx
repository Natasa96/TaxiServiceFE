import {
  List,
  Text,
  ListIcon,
  Box,
  Heading,
  VStack,
  HStack,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdLocationOn,
  MdAccessTime,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth";
import { RIDE_STATUS, USER_ROLES } from "../consts";
import AcceptRideModal from "./AcceptRideModal";
import useApiMutation from "../hooks/useApiMutations";
import { useState } from "react";
import moment from "moment";
import { convertUTCToLocal } from "../utils/convert-time";

//Klikom na "zapocni voznju" radimo mutaciju acceptRide

const RideList = ({ rides = [], title = "" }) => {
  const { user, setHasActiveRide, setActiveRideId } = useAuthStore();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [modalRide, setModalRide] = useState();
  const { mutateAsync: acceptRideMutation } = useApiMutation(
    "post",
    "/accept-ride",
    {
      onSuccess: (data) => {
        setHasActiveRide(true);
        setActiveRideId(data.id);
      },
    }
  );

  if (USER_ROLES[user?.role] === undefined) {
    return <Spinner />;
  }

  const getHoverStyles = (role, ride) => {
    if (USER_ROLES[role] === "Driver" && !ride?.estimatedRideTime)
      return {
        _hover: {
          bg: "gray.200",
          cursor: "pointer",
          borderColor: "green.500",
          borderWidth: "2px",
        },
      };
    return {};
  };

  const calculateRideDuration = (ride) => {
    if (!ride?.estimatedRideTime) {
      return "-";
    }
    const estimatedRidingTime = moment(
      convertUTCToLocal(ride?.estimatedRideTime)
    );
    const estimatedArrivalTime = moment(
      convertUTCToLocal(ride?.estimatedArrivalTime)
    );
    return `${Math.abs(
      estimatedRidingTime.diff(estimatedArrivalTime, "seconds")
    )} sec`;
  };

  const acceptRide = async () => {
    acceptRideMutation({
      acceptTime: new Date(),
      rideId: modalRide.id,
      status: RIDE_STATUS.ACCEPTED,
    });
  };

  const handleOpenRideModal = (ride) => {
    if (USER_ROLES[user?.role] === "Driver" && !ride?.estimatedRideTime) {
      setModalRide(ride);
      onOpen();
    }
  };

  return (
    <Box p={6} shadow="md" borderWidth="1px" maxH="90vh" overflowY="auto">
      {title && (
        <Heading fontSize="xl" mb={4}>
          {title}
        </Heading>
      )}
      <AcceptRideModal isOpen={isOpen} onClose={onClose} onClick={acceptRide} />
      <List spacing={3}>
        {rides.map((ride, index) => (
          <Box
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            onClick={() => handleOpenRideModal(ride)}
            {...getHoverStyles(user?.role, ride)}
            transition="background-color 0.2s, border-color 0.2s"
          >
            <VStack align="start">
              <HStack>
                <ListIcon as={MdLocationOn} color="green.500" />
                <Text fontWeight="bold">Start Address:</Text>
                <Text>{ride.startAddress}</Text>
              </HStack>
              <HStack>
                <ListIcon as={MdLocationOn} color="red.500" />
                <Text fontWeight="bold">End Address:</Text>
                <Text>{ride.endAddress}</Text>
              </HStack>
              <HStack>
                <ListIcon as={MdAccessTime} color="blue.500" />
                <Text fontWeight="bold">Duration:</Text>
                <Text>{calculateRideDuration(ride) ?? "-"}</Text>
              </HStack>
              <HStack>
                <ListIcon as={MdPerson} color="purple.500" />
                <Text fontWeight="bold">Driver:</Text>
                <Text>{ride.driver ?? "-"}</Text>
              </HStack>
              <HStack>
                <ListIcon as={MdPerson} color="orange.500" />
                <Text fontWeight="bold">User:</Text>
                <Text>{ride.user ?? "-"}</Text>
              </HStack>
              <HStack>
                <ListIcon as={MdAttachMoney} color="teal.500" />
                <Text fontWeight="bold">Price:</Text>
                <Text>${ride.price}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </List>
    </Box>
  );
};

RideList.propTypes = {
  rides: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default RideList;
