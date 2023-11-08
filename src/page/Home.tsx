import Loading from '../component/Loading';
import { RootState } from '@/store';
import { useSelector } from "react-redux";
//import { Outlet } from "react-router-dom";

const Home = () => {
    const {loading} = useSelector((state: RootState) => state.general);
    
  return (
    <div>
{loading && <Loading/>} 
    {/*<Outlet />*/}
    </div>
  )
}

export default Home