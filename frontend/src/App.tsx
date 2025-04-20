import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserManagement from "./pages/UserManagement";

function App() {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
        </Route>
    </Routes>
  )
}

export default App
