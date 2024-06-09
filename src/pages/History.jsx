import ResourceContainer from "../components/ResourceContainer";
import { useData } from "../context/DataContext";
import RideList from "../components/RideList";
import Layout from "../components/Layout";

function History() {
  const { data } = useData();
  console.log(data?.rides);

  return (
    <Layout>
      <ResourceContainer method="get" queryKey="history" url="/history">
        <RideList rides={data?.history} title="History" />
      </ResourceContainer>
    </Layout>
  );
}

export default History;
