import ResourceContainer from "../components/ResourceContainer";
import { useData } from "../context/DataContext";
import RideList from "../components/RideList";
import Layout from "../components/Layout";

function Rides() {
  const { data } = useData();
  console.log(data?.rides);

  return (
    <Layout>
      <ResourceContainer method="get" queryKey="rides" url="/rides">
        <RideList rides={data?.rides} title="All Rides" />
      </ResourceContainer>
    </Layout>
  );
}

export default Rides;
