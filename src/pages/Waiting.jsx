import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import useAuthStore from "../store/auth";
import { RIDE_STATUS, USER_ROLES } from "../consts/index";
import Chat from "../components/Chat";
import ResourceContainer from "../components/ResourceContainer";
import { useData } from "../context/DataContext";
import useApiMutation from "../hooks/useApiMutations";
import { convertUTCToLocal } from "../utils/convert-time";
import moment from "moment";

const Waiting = () => {
  const { setHasActiveRide } = useAuthStore();
  const { user, activeRideId } = useAuthStore();

  const [waitingTime, setWaitingTime] = useState(0);
  const [rideTime, setRideTime] = useState(0);

  const { data } = useData();

  const { mutateAsync: startRideMutation } = useApiMutation(
    "put",
    "start-ride",
    {
      onSuccess: (data) => {
        activeRideId(data.id);
      },
    }
  );
  const { mutateAsync: finishRideAsync } = useApiMutation(
    "put",
    "/finish-ride"
  );

  const startRide = async () => {
    const estimatedRideDate = new Date();
    const estimatedTimeSeconds = Math.floor(Math.random() * 120) + 10;
    estimatedRideDate.setSeconds(
      estimatedRideDate.getSeconds() + estimatedTimeSeconds
    );
    startRideMutation({
      startTime: moment(),
      rideDuration: estimatedRideDate,
      status: 1,
      rideId: data?.ride.id,
    });
  };

  const finishRide = async () => {
    setHasActiveRide(false);
    await finishRideAsync({
      rideId: data?.ride.id,
      status: RIDE_STATUS.FINISHED,
    });
  };

  // setujemo state za timere
  useEffect(() => {
    if (waitingTime > 0) {
      const interval = setInterval(() => {
        setWaitingTime((prevState) => prevState - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (rideTime > 0) {
      const interval = setInterval(() => {
        setRideTime((prevState) => prevState - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [waitingTime, rideTime]);

  //Dodati da kada istekne vreme krene da tece rideTime / da li valja uslov u elst if
  useEffect(() => {
    if (data?.ride) {
      //proveri dal ride ima waiting time i nema ride duration
      if (data?.ride.estimatedArrivalTime && !data?.ride.estimatedRideTime) {
        const estimatedArrivalTime = moment(
          convertUTCToLocal(data?.ride.estimatedArrivalTime)
        );
        const currentTime = moment();
        setWaitingTime(estimatedArrivalTime.diff(currentTime, "seconds"));
      }
      if (data?.ride.estimatedRideTime) {
        const estimatedRidingTime = moment(
          convertUTCToLocal(data?.ride.estimatedRideTime)
        );
        const currentTime = moment();
        setRideTime(estimatedRidingTime.diff(currentTime, "seconds"));
        setWaitingTime(0);
      }
    }
  }, [data?.ride]);

  return (
    <ResourceContainer
      queryKey="ride"
      method="get"
      url={"/rides/" + activeRideId}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        pt={50}
        gap={10}
        height="100vh"
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
      >
        {waitingTime > 0 && data?.ride?.rideStatus !== 1 && (
          <Text fontSize="xxx-large" mb={4}>
            Waiting for your ride....
          </Text>
        )}
        {waitingTime <= 0 && data?.ride?.rideStatus !== 1 && (
          <Text fontSize="xxx-large" mb={4}>
            Ride starting soon...
          </Text>
        )}
        {data?.ride?.rideStatus == 1 && (
          <Text fontSize="xxx-large" mb={4}>
            Ride in progress
          </Text>
        )}
        {data?.ride?.driver && (
          <Text fontSize="xxx-large" mb={4}>
            Assigned driver: {data?.ride.driver}
          </Text>
        )}
        {waitingTime >= 0 && rideTime === 0 && (
          <CircularProgress
            value={(waitingTime / 60) * 100}
            size="340px"
            thickness="8px"
            color="white"
            trackColor="rgba(255, 255, 255, 0.3)"
          >
            <CircularProgressLabel fontSize={20}>
              {waitingTime} seconds
            </CircularProgressLabel>
          </CircularProgress>
        )}

        {waitingTime <= 0 && rideTime >= 0 && (
          <CircularProgress
            value={(rideTime / 60) * 100}
            size="340px"
            thickness="8px"
            color="white"
            trackColor="rgba(255, 255, 255, 0.3)"
          >
            <CircularProgressLabel fontSize={20}>
              {rideTime} seconds
            </CircularProgressLabel>
          </CircularProgress>
        )}
        {data?.ride?.driver && <Chat userId={user.id} />}
        {USER_ROLES[user?.role] === "Driver" && (
          <HStack>
            <Button size="lg" colorScheme="green" onClick={startRide}>
              Start Ride
            </Button>
            <Button size="lg" colorScheme="red" onClick={finishRide}>
              End Ride
            </Button>
          </HStack>
        )}
      </Box>
    </ResourceContainer>
  );
};

export default Waiting;
