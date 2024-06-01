// routing
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import WhatsAppSender from "./components/WhatsAppSender/WhatsAppSender";
import BillsPage from "./pages/BillsPage/BillsPage";
import ChartsPage from "./pages/ChartsPage/ChartsPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import HomePage from "./pages/HomePage/HomePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import Login from "./pages/Login/Login";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import Register from "./pages/Register/Register";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoutes>
                <BillsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoutes>
                <CustomerPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <OrdersPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/charts"
            element={
              <ProtectedRoutes>
                <ChartsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/whatsapp"
            element={
              <ProtectedRoutes>
                <WhatsAppSender />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoutes>
                <EmployeesPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoutes>
                <InventoryPage />
              </ProtectedRoutes>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
