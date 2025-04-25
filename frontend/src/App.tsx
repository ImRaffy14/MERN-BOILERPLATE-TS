import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManagement from "./pages/UserManagement";
import WithSocket from "./components/WithSocket";
import FullPageLoader from "./components/FullpageLoader";
import { Toaster } from "react-hot-toast";

type AppRoute = {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
};

function App() {

  const authRoutes: AppRoute[] = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const protectedRoutes: AppRoute[] = [
    {
      path: "/",
      element: (
        <WithSocket>
          <MainLayout />
        </WithSocket>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "users", element: <UserManagement /> },
      ],
    },
  ];

  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map((route, index) => (
      <Route key={`${route.path}-${index}`} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Test route */}
        <Route path="/test" element={<FullPageLoader />} />

        {renderRoutes(authRoutes)}
        {renderRoutes(protectedRoutes)}
      </Routes>
    </>
  );
}

export default App;