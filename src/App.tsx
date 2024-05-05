import CardsComponent from "./components/Cards";
import { useGetJDListQuery } from "./store/jdListApi";
import "./App.css";

function App() {
  const { data, isLoading, isError } = useGetJDListQuery({
    payload: { limit: 10, offset: 0 },
  });

  return (
    <div>
      <CardsComponent data={data?.jdList || []} />
    </div>
  );
}

export default App;
