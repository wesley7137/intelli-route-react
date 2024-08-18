import React, { Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

//Amin
import AdminNavbar from "./components/Navbars/AdminNavbar";
import FooterAdmin from "./components/Footers/FooterAdmin";

//Auth

import AuthNavbar from "./components/Navbars/AuthNavbar";
import FooterSmall from "./components/Footers/FooterSmall";

// Components
import HeaderStats from "./components/Headers/HeaderStats";
import Sidebar from "./components/Sidebar/Sidebar";
import "./assets/styles/index.css";
import "./assets/styles/tailwind.css";

// Pages
const Login = React.lazy(() => import("./views/login/Login"));
const Register = React.lazy(() => import("./views/register/Register"));
const Playground = React.lazy(() => import("./views/playground/Playground"));
const CodeBuilder = React.lazy(() => import("./views/codebuilder/CodeBuilder"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Maps = React.lazy(() => import("./views/admin/Maps"));
const Settings = React.lazy(() => import("./views/admin/Settings"));
const Tables = React.lazy(() => import("./views/admin/Tables"));

const App = () => {
  const dispatch = useDispatch();
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      dispatch({ type: "SET_THEME", payload: theme });
    }
  }, [dispatch]);

  return (
    <AuthProvider>
      <HashRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <Routes>
            {/* Authentication Routes */}
            <Route
              path="/auth/*"
              element={
                <>
                  <AuthNavbar transparent />
                  <main>
                    <section className="relative w-full h-full py-40 min-h-screen">
                      <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                          backgroundImage:
                            "url(" +
                            require("assets/img/register_bg_2.png").default +
                            ")",
                        }}
                      ></div>
                      <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="*" element={<Navigate to="login" />} />
                      </Routes>
                      <FooterSmall absolute />
                    </section>
                  </main>
                </>
              }
            />

            {/* Admin & Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminNavbar />
                  <Sidebar />
                  <div className="relative md:ml-64 bg-blueGray-100">
                    <HeaderStats />
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="maps" element={<Maps />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="tables" element={<Tables />} />
                        <Route path="*" element={<Navigate to="dashboard" />} />
                      </Routes>
                      <FooterAdmin />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Other Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/playground" element={<Playground />} />
              <Route path="/codebuilder" element={<CodeBuilder />} />
            </Route>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/auth/login" />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
