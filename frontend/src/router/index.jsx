import { createBrowserRouter } from 'react-router-dom';
import DashboardAmin from '../admin/pages/overview';
import LayoutDashboard from '../admin/components/layout';
import CeritaPage from '../admin/pages/cerita';
import CreateCeritaPage from '../admin/pages/cerita-create';
import ManageCerita from '../admin/pages/cerita-manage';
import ProvinsiItem from '../admin/pages/provinsi/provinsi-item';
import ManageProvinsiPage from '../admin/pages/provinsi';
import CreateProvinsiPage from '../admin/pages/provinsi-create/provinsi-create';
import LandingPage from '../public/pages';
import Peta from '../public/pages/peta';

// Route admin
const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <LayoutDashboard />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardAmin />
      },
      {
        path: '/dashboard/cerita',
        element: <CeritaPage />
      },
      {
        path: '/dashboard/cerita/create',
        element: <CreateCeritaPage />
      },
      {
        path: '/dashboard/cerita/:id/manage',
        element: <ManageCerita />
      },
      {
        path: '/dashboard/provinsi',
        element: <ManageProvinsiPage />
      },
      {
        path: '/dashboard/provinsi/create',
        element: <CreateProvinsiPage />
      }
    ],
  },
  // Route public
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/peta',
    element: <Peta />
  }
])

export default router;