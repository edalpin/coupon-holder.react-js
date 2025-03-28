import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from '../features/auth/sign-in';
import { Campaigns } from '../features/campaigns/campaigns';
import { Campaign } from '../features/campaigns/campaign';
import { NotFound } from './components/not-found';
import { ProtectedUserRoutes } from './guards/protected-user-routes';

export const CouponHolderRoutes = () => (
  <BrowserRouter basename="coupon-holder.react-js">
    <Routes>
      {/* Index */}
      <Route path="/" element={<Navigate to="/campaigns" replace />} />

      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />

      {/* User Routes */}
      <Route element={<ProtectedUserRoutes />}>
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<Campaign />} />
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
