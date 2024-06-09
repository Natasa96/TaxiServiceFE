import ResourceContainer from "../components/ResourceContainer";
import { useData } from "../context/DataContext";
import DriverList from "../components/DriverList";
import Layout from "../components/Layout";

function Drivers() {
  const { data } = useData();

  return (
    <Layout>
      <ResourceContainer method="get" queryKey="drivers" url="/drivers">
        <DriverList drivers={data?.drivers} title="All Drivers" />
      </ResourceContainer>
    </Layout>
  );
}

export default Drivers;
