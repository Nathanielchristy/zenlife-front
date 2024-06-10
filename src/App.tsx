import {
  Authenticated,
  Refine,
  useGetIdentity,
  useLiveMode,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";

import { JobCreate, JobEdit, JobList, JobShow } from "./pages/jobs";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/userControl";

import socketIOClient from "socket.io-client";
import { IUser } from "./interfaces";

import {
  BellOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { newEnforcer } from "casbin";
import { adapter, model } from "./accessControls";

import useRoleStore from "./store";
import { DashList } from "./pages/dashboard";

import { liveProvider } from "@refinedev/ably";
import { ablyClient } from "./utility/ablyClient";

const API_URL = "http://localhost:5000/api";

function App() {
  const initialRole = sessionStorage.getItem("userRole") || "guest";
  useRoleStore.setState({ role: initialRole });

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            {/* <DevtoolsProvider> */}
            <Refine
              dataProvider={{
                default: dataProvider(API_URL, axiosInstance),
                users: dataProvider(API_URL, axiosInstance),
              }}
              liveProvider={liveProvider(ablyClient)}
              // liveProvider={liveProvider(socketClient)}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              routerProvider={routerBindings}
              accessControlProvider={{
                can: async ({ action, params, resource }) => {
                  const { role } = useRoleStore.getState();
                  const enforcer = await newEnforcer(model, adapter);
                  if (
                    action === "delete" ||
                    action === "edit" ||
                    action === "show"
                  ) {
                    return Promise.resolve({
                      can: await enforcer.enforce(
                        role,
                        `${resource}/${params?.id}`,
                        action
                      ),
                    });
                  }
                  if (action === "field") {
                    return Promise.resolve({
                      can: await enforcer.enforce(
                        role,
                        `${resource}/${params?.field}`,
                        action
                      ),
                    });
                  }
                  return {
                    can: await enforcer.enforce(role, resource, action),
                  };
                },
              }}
              resources={[
                {
                  name: "jobs",
                  list: "/jobs",
                  edit: "/jobs/edit/:id",
                  create: "/jobs/create",
                  show: "/jobs/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",

                  meta: {
                    canDelete: true,
                    icon: <UserOutlined />,
                  },
                },
                {
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    icon: <DashboardOutlined />, // Add an icon if desired
                  },
                },
              ]}
              options={{
                liveMode: "auto",
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "0WUGjA-7ABx0K-j6cNt4",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="Zen Life"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    element={<NavigateToResource resource="dashboard" />}
                  />
                  <Route path="/dashboard">
                    <Route index element={<DashList />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                  <Route
                    index
                    element={<NavigateToResource resource="jobs" />}
                  />
                  <Route path="/jobs">
                    <Route index element={<JobList />} />
                    <Route path="edit/:id" element={<JobEdit />} />
                    <Route path="create" element={<JobCreate />} />
                    <Route path="show/:id" element={<JobShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                  <Route
                    index
                    element={<NavigateToResource resource="users" />}
                  />
                  {/* <Route
                    element={<NavigateToResource resource="notifications" />}
                  />
                  <Route
                    path="/notifications"
                    element={
                      <Notifications
                        apiUrl={API_URL}
                        axiosInstance={axiosInstance}
                      />
                    }
                  /> */}
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="create" element={<UserCreate />} />
                    <Route path="edit/:id" element={<UserEdit />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  {/* <Route path="/register" element={<Register />} /> */}
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <ToastContainer />
            {/* <DevtoolsPanel />  */}
            {/* </DevtoolsProvider> */}
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
