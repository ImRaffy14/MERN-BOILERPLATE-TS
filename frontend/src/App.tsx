import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/AdminPanel";

function App() {

  return (
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
