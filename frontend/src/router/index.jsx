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
import ProtectedRoute from '../public/components/protectedRoute';
import RequireAdmin from '../public/components/requireAdmin';
import ManageUser from '../admin/pages/users/manageUser';
import Kalender from '../public/pages/kalender';
import Cerita from '../public/pages/cerita';
import KalenderBudaya from '../public/pages/kalender';

// Route admin
const router = createBrowserRouter([
  {
    element: <RequireAdmin />,
    children: [
      {
        path: '/dashboard',
        element: <LayoutDashboard />,
        children: [
          {
            index: true,
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
          },
          {
            path: '/dashboard/manage-users',
            element: <ManageUser />
          }
        ],
      },
    ]
  },

  // Route public
  // Route public
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/peta',
        element: <Peta />,
      },
      {
        path: '/kalender',
        element: <KalenderBudaya />,
      },
      {
        path: '/cerita',
        element: <Cerita />,
      }
    ]
  }


])

export default router;