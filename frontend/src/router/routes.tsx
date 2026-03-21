import { type RouteObject } from 'react-router-dom';

import { MainLayout } from '@/layout/main-layout/MainLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { FeedPage } from '@/pages/FeedPage';
import { LoginPage } from '@/pages/LoginPage';
import { AuthGuard } from '@/router/AuthGuard';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
    ],
  },
];