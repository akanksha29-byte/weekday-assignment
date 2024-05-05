import './App.css';
import { useGetJDListQuery } from './store/jdListApi';

function App() {
  const data = useGetJDListQuery({ payload: { limit: 10, offset: 0 } });
  
  return (
    <div>Hello</div>
  )
}

export default App;
