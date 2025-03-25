import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Campaigns } from '../pages/campaigns';
import { Coupons } from '../pages/coupons';

export const CouponHolderRoutes = () => (
  <BrowserRouter basename="coupon-holder.react-js">
    <Routes>
      <Route path="/" element={<Campaigns />} />
      <Route path="/campaigns/:campaignId" element={<Coupons />} />
    </Routes>
  </BrowserRouter>
);
