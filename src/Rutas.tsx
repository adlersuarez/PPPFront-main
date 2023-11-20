//@ts-ignore
import { createBrowserRouter } from 'react-router-dom';
//@ts-ignore
import Morti from '@/page/prueba/index';
//@ts-ignore
import Home from './page/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        children: [
          {
            path: '/',
            element: <Morti/>,
          }
        ]
      }
])
export default router;