import { createBrowserRouter } from 'react-router-dom';
import DashboardAmin from '../admin/overview';


const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardAmin />,
  }
])

export default router;