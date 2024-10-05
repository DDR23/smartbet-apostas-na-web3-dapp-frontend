import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AppLayout from './components/_ui/layouts/AppLayout.tsx';
import PageHome from './pages/home/PageHome.tsx';
import './styles/globals.css'
import PageAbout from './pages/about/PageAbout.tsx';
import PageBets from './pages/bets/PageBets.tsx';

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
    <RouterProvider router={router} />
  </StrictMode>
);
