import { type ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from '@/pages/sign-in';
import { Campaigns } from '@/pages/campaigns';
import { Campaign } from '@/pages/campaign';
import { NotFound } from '@/pages/not-found';
import { ProtectedRoutes } from '@/components/protected-routes';
import { ProtectedRoutesLayout } from '@/components/protected-routes-layout';

type RouteConfig = {
  path: string;
  element: ReactElement;
};

const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="/campaigns" replace />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
];

const protectedRoutes: RouteConfig[] = [
  {
    path: '/campaigns',
    element: <Campaigns />,
  },
  {
    path: '/campaigns/:id',
    element: <Campaign />,
  },
];

const notFoundRoute: RouteConfig = {
  path: '*',
  element: <NotFound />,
};

export const CouponHolderRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<ProtectedRoutesLayout />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path={notFoundRoute.path} element={notFoundRoute.element} />
    </Routes>
  </BrowserRouter>
);
