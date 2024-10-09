import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AppLayout from './components/_ui/layouts/AppLayout.tsx';
import PageHome from './pages/home/PageHome.tsx';
import './styles/globals.css'
import PageAbout from './pages/about/PageAbout.tsx';
import PageBets from './pages/bets/PageBets.tsx';
import PageBetId from './pages/betId/PageBetId.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import PageAdminCreateBet from './pages/admin/PageAdminCreateBet.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <PageHome />
          },
          {
            path: '/bets',
            element: <PageBets />
          },
          {
            path: '/about',
            element: <PageAbout />
          },
          {
            path: '/bet/:id',
            element: <PageBetId />
          },
          {
            path: '/admin/createbet',
            element: <PageAdminCreateBet />
          },
        ]
      },
      {
        path: '*',
        element: <Navigate to='/' replace />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
