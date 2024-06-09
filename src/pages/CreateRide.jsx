import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import useApiMutation from "../hooks/useApiMutations";
import useAuthStore from "../store/auth";
import { useData } from "../context/DataContext";

const CreateRide = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const { setHasActiveRide, setActiveRideId } = useAuthStore();
  const { setData } = useData();

  const { mutateAsync: createRide } = useApiMutation("post", "/create", {
    onError: () => {},
    onSuccess: (responseData) => {
      setHasActiveRide(true);
      setData((prevState) => ({
        ...prevState,
        activeRide: { ...responseData },
      }));
      setActiveRideId(responseData.id);
    },
  });

  const calculatePriceAndTime = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    const currentPrice = Math.floor(Math.random() * 100) + 50;
    const estimatedTime = Math.floor(Math.random() * 120) + 10;
    const estimatedDate = new Date();
    estimatedDate.setSeconds(estimatedDate.getSeconds() + estimatedTime);
    // Mocking random values for price and estimated time
    setPrice(currentPrice);
    setEstimatedTime(estimatedTime);
    setValue("ridePrice", currentPrice);
    setValue("estimatedArrivalTime", estimatedDate);
  };

  const onSubmit = async (data) => {
    await createRide(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <FormControl isRequired>
            <FormLabel>Start Address: </FormLabel>
            <Input
              {...register("startAddress.streetName")}
              placeholder="Street Name"
            />
            <Input
              {...register("startAddress.streetNumber")}
              placeholder="Street Number"
            />
            <Input {...register("startAddress.city")} placeholder="City" />
            <Input
              {...register("startAddress.zipcode")}
              placeholder="Zipcode"
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>End Address: </FormLabel>
            <Input
              {...register("endAddress.streetName")}
              placeholder="Street Name"
            />
            <Input
              {...register("endAddress.streetNumber")}
              placeholder="Street Number"
            />
            <Input {...register("endAddress.city")} placeholder="City" />
            <Input {...register("endAddress.zipcode")} placeholder="Zipcode" />
          </FormControl>
          <Button
            onClick={calculatePriceAndTime}
            style={{ display: price !== "" ? "none" : "flex" }}
            mt={4}
            isLoading={isLoading}
            loadingText="Calculating"
          >
            Create ride
          </Button>
        </Box>
        {price && estimatedTime && (
          <Box p={4}>
            <FormControl isDisabled>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputRightElement pointerEvents="none">rsd</InputRightElement>
                <Input value={price} />
              </InputGroup>
            </FormControl>
            <FormControl isDisabled mt={4}>
              <FormLabel>Estimated Time</FormLabel>
              <InputGroup>
                <InputRightElement pointerEvents="none">sec</InputRightElement>
                <Input value={estimatedTime} />
              </InputGroup>
            </FormControl>
            <Button
              mt={4}
              type="submit"
              isLoading={isLoading}
              loadingText="Submitting"
            >
              Accept
            </Button>
          </Box>
        )}
      </form>
    </Layout>
  );
};

export default CreateRide;
