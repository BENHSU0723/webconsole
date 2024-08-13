import React, { useState } from "react";
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
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ChargingTable from "./pages/Charging/ChargingTable";
import Vn5glanGpCreate from "./pages/Vn5glanGroupCreate";
import Vn5glanGpList from "./pages/Vn5glanGroupList";
import Vn5glanGpUpdate from "./pages/Vn5glanGroupUpdate";
import Vn5glanGpRead from "./pages/Vn5glanGroupRead";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginContext, User } from "./LoginContext";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <StatusList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status/:id"
            element={
              <ProtectedRoute>
                <StatusRead />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriber"
            element={
              <ProtectedRoute>
                <SubscriberList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriber/create"
            element={
              <ProtectedRoute>
                <SubscriberCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriber/create/:id/:plmn"
            element={
              <ProtectedRoute>
                <SubscriberCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriber/:id/:plmn"
            element={
              <ProtectedRoute>
                <SubscriberRead />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <AnalysisList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant"
            element={
              <ProtectedRoute>
                <TenantList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/create"
            element={
              <ProtectedRoute>
                <TenantCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/update/:id"
            element={
              <ProtectedRoute>
                <TenantUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/:id/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/:id/user/create"
            element={
              <ProtectedRoute>
                <UserCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/:id/user/update/:uid"
            element={
              <ProtectedRoute>
                <UserUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StatusList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/charging"
            element={
              <ProtectedRoute>
                <ChargingTable />
              </ProtectedRoute>
            }
          />
                    <Route
          path="/vn5glanGroup/create"
          element={
            <ProtectedRoute>
              <Vn5glanGpCreate />
            </ProtectedRoute>
          }
          />
          <Route
          path="/vn5glanGroup"
          element={
            <ProtectedRoute>
              <Vn5glanGpList />
            </ProtectedRoute>
          }
          />
          <Route
          path="/vn5glanGroup/update/:extGpId"
          element={
            <ProtectedRoute>
              <Vn5glanGpUpdate />
            </ProtectedRoute>
          }
          />
          <Route
          path="/vn5glanGroup/:extGpId"
          element={
            <ProtectedRoute>
              <Vn5glanGpRead />
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}
