import React, { lazy, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { hideLoading, showLoading } from "./redux/rootReducer";
import LoadingBar from "react-top-loading-bar";
import LayoutLoader from "./components/DefaultLayout/LayoutLoader";

const PasswordReset = lazy(() =>
  import("./components/PasswordReset/PasswordReset")
);
const WhatsAppSender = lazy(() =>
  import("./components/WhatsAppSender/WhatsAppSender")
);
const InvoicePage = lazy(() => import("./pages/InvoicePage/InvoicePage"));
const ChartsPage = lazy(() => import("./pages/ChartsPage/ChartsPage"));
const CustomerPage = lazy(() => import("./pages/CustomerPage/CustomerPage"));
const EmployeesPage = lazy(() => import("./pages/EmployeesPage/EmployeesPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage/InventoryPage"));
const Login = lazy(() => import("./pages/Login/Login"));
const OrdersPage = lazy(() => import("./pages/OrdersPage/OrdersPage"));
const Register = lazy(() => import("./pages/Register/Register"));

const Loader = () => <LayoutLoader />;

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rootReducer.loading);
  const loadingBarRef = useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      dispatch(showLoading());
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      dispatch(hideLoading());
    };

    const handleRouteChangeComplete = () => {
      dispatch(hideLoading());
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    };

    handleRouteChangeStart();

    return () => {
      handleRouteChangeComplete();
    };
  }, [location, dispatch]);

  return (
    <>
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      {loading && <Loader />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/invoice"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <InvoicePage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <CustomerPage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <OrdersPage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <ChartsPage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/whatsapp"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <WhatsAppSender />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <EmployeesPage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<Loader />}>
                <InventoryPage />
              </Suspense>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/password-reset"
          element={
            <Suspense fallback={<Loader />}>
              <PasswordReset />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;

// eslint-disable-next-line react/prop-types
export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("auth"));

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
