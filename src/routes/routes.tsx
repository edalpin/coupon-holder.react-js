import { type ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from '@/pages/sign-in';
import { Campaigns } from '@/pages/campaigns';
import { NotFound } from '@/pages/not-found';
import { ProtectedUserRoutes } from '@/components/protected-user-routes';
import { ProtectedRoutesLayout } from '@/components/protected-routes-layout';
import { ProtectedAdminRoutes } from '@/components/protected-admin-routes';
import { CampaignCreate } from '@/pages/campaign-create';
import { CouponCreate } from '@/pages/coupon-create';

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

const protectedUserRoutes: RouteConfig[] = [
  {
    path: '/campaigns',
    element: <Campaigns />,
  },
];

const protectedAdminRoutes: RouteConfig[] = [
  {
    path: '/campaigns/create',
    element: <CampaignCreate />,
  },
  {
    path: '/campaigns/:id/coupons/create',
    element: <CouponCreate />,
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

      {/* Protected User Routes */}
      <Route element={<ProtectedUserRoutes />}>
        <Route element={<ProtectedRoutesLayout />}>
          {protectedUserRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedAdminRoutes />}>
        <Route element={<ProtectedRoutesLayout />}>
          {protectedAdminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
      {/* Not Found Route */}
      <Route path={notFoundRoute.path} element={notFoundRoute.element} />
    </Routes>
  </BrowserRouter>
);
