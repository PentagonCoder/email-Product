import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;