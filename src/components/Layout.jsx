import { Box, Flex, Spinner } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth";
import { USER_ROLES } from "../consts";
import Waiting from "../pages/Waiting";

const Layout = ({ children }) => {
  const { user, hasActiveRide } = useAuthStore();

  if (USER_ROLES[user?.role] === undefined) {
    return <Spinner />;
  }

  return (
    <Flex>
      <Sidebar userRole={USER_ROLES[user?.role]} />
      <Box flex="1">
        <Header />
        {hasActiveRide ? <Waiting /> : <Box p={4}>{children}</Box>}
      </Box>
    </Flex>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
