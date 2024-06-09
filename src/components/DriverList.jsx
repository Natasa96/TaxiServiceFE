import { List, Heading, ListItem, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import DriverCard from "./DriverListItem";
import { useData } from "../context/DataContext";
import useAuthMutation from "../hooks/useAuthMutation";

const DriverList = ({ drivers, title }) => {
  const { data, setData } = useData();
  const { mutateAsync: verifyMutation } = useAuthMutation("post", "/verify");
  const { mutateAsync: blockMutation } = useAuthMutation("post", "/block");

  const handleChangeVerification = async (driver) => {
    const responseData = await verifyMutation({ driverId: driver.id });
    const updatedDrivers = data.drivers.map((driver) => {
      if (driver.id === responseData.driverId) {
        return { ...driver, verificationState: responseData.status };
      }
      return driver;
    });
    setData({ ["drivers"]: updatedDrivers });
  };

  const handleBlockDriver = async (driver) => {
    const responseData = await blockMutation({ driverId: driver.id }); // {tvoj response od BE single driver}
    const updateDrivers = data.drivers.map((driver) => {
      if (driver.id === responseData.driverId) {
        return { ...driver, verificationState: responseData.status };
      }
      return driver;
    });
    setData({ ["drivers"]: updateDrivers });
  };

  return (
    <Box maxHeight="700px" overflowY="auto">
      <List spacing={4}>
        {title && (
          <Heading fontSize="xl" align="center" mb={4}>
            {title}
          </Heading>
        )}
        {drivers.map((driver, index) => (
          <ListItem key={index} width={"100%"}>
            <DriverCard
              driver={driver}
              onChangeVerification={handleChangeVerification}
              onChangeBlock={handleBlockDriver}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

DriverList.propTypes = {
  drivers: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default DriverList;
