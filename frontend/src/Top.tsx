import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatusList from "./pages/StatusList";
import StatusRead from "./pages/StatusRead";
import SubscriberList from "./pages/SubscriberList";
import SubscriberCreate from "./pages/SubscriberCreate";
import SubscriberRead from "./pages/SubscriberRead";
import AnalysisList from "./pages/AnalysisList";
import TenantList from "./pages/TenantList";
import TenantCreate from "./pages/TenantCreate";
import TenantUpdate from "./pages/TenantUpdate";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserUpdate from "./pages/UserUpdate";
import ChangePassword from "./pages/ChangePassword";
import Vn5glanGpCreate from "./pages/Vn5glanGroupCreate";
import Vn5glanGpList from "./pages/Vn5glanGroupList";
import Vn5glanGpUpdate from "./pages/Vn5glanGroupUpdate";
import Vn5glanGpRead from "./pages/Vn5glanGroupRead";

export default function Top() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/status" element={<StatusList />} />
        <Route path="/status/:id" element={<StatusRead />} />
        <Route path="/subscriber" element={<SubscriberList />} />
        <Route path="/subscriber/create" element={<SubscriberCreate />} />
        <Route path="/subscriber/create/:id/:plmn" element={<SubscriberCreate />} />
        <Route path="/subscriber/:id/:plmn" element={<SubscriberRead />} />
        <Route path="/analysis" element={<AnalysisList />} />
        <Route path="/tenant" element={<TenantList />} />
        <Route path="/tenant/create" element={<TenantCreate />} />
        <Route path="/tenant/update/:id" element={<TenantUpdate />} />
        <Route path="/tenant/:id/user" element={<UserList />} />
        <Route path="/tenant/:id/user/create" element={<UserCreate />} />
        <Route path="/tenant/:id/user/update/:uid" element={<UserUpdate />} />
        <Route path="/vn5glanGroup/create" element={<Vn5glanGpCreate />} />
        <Route path="/vn5glanGroup" element={<Vn5glanGpList />} />
        <Route path="/vn5glanGroup/update/:extGpId" element={<Vn5glanGpUpdate />} />
        <Route path="/vn5glanGroup/:extGpId" element={<Vn5glanGpRead />} />
        <Route path="/password" element={<ChangePassword />} />
        <Route path="/" element={<StatusList />} />
      </Routes>
    </BrowserRouter>
  );
}
