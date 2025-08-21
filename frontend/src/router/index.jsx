import { createBrowserRouter } from 'react-router-dom';
import DashboardAmin from '../admin/overview';

// Route admin
const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardAmin />,
  }
])

export default router;