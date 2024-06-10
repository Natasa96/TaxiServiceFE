import { Text } from "@chakra-ui/react";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <Text whiteSpace="pre-line" fontSize="30px" color="black">
        This is your Home page, congrats on loging in! {"\n"}
        You can now start using our Taxi service for easier navigation around
        towns! {"\n"}Good luck!
      </Text>
    </Layout>
  );
};

export default Home;
