import { Box, Flex, Spinner } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth";
import { USER_ROLES } from "../consts";
import Waiting from "../pages/Waiting";
import { useEffect } from "react";
import { useData } from "../context/DataContext";

const Layout = ({ children }) => {
  const { user, hasActiveRide, setHasActiveRide, setActiveRideId } =
    useAuthStore();
  const { data } = useData();
  console.log(hasActiveRide);

  useEffect(() => {
    if (data?.ride?.status === 2) {
      setHasActiveRide(false);
      setActiveRideId(null);
    }
    if (data?.activeRide?.id) {
      setHasActiveRide(true);
    }
  }, [data?.ride]);

  if (USER_ROLES[user?.role] === undefined) {
    return <Spinner />;
  }

  const renderLayout = () => {
    if (hasActiveRide === true) {
      return <Waiting />;
    } else {
      return <Box p={4}>{children}</Box>;
    }
  };

  return (
    <Flex>
      <Sidebar userRole={USER_ROLES[user?.role]} />
      <Box flex="1">
        <Header />
        {renderLayout()}
      </Box>
    </Flex>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
