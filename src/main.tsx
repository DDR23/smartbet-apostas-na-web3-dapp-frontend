import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './styles/globals.css'
import PageBet from './pages/bet/PageBet.tsx';
import AppLayout from './components/_ui/layouts/AppLayout.tsx';
import PageHome from './pages/home/PageHome.tsx';
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
            element: <PageBet />
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
