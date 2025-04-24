import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManagement from "./pages/UserManagement";
import WithSocket from "./components/WithSocket";
import FullPageLoader from "./components/FullpageLoader";
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <Routes>
      <Route path="/test" element={<FullPageLoader/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<WithSocket><MainLayout /></WithSocket>}>
        <Route index element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
      </Route>
    </Routes>
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WithSocket><MainLayout /></WithSocket>}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
