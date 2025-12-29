import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserHeader from "./components/Header";
import AdminHeader from "./components/AdminComponents/AdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* HEADER */}
      {isAdminPage ? <AdminHeader /> : <UserHeader />}

      {/* TOASTS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      {/* CONTENT */}
      {isAdminPage ? (
        <main className="px-4 py-3">
          <Outlet />
        </main>
      ) : (
        <Container className="my-4">
          <Outlet />
        </Container>
      )}
    </>
  );
};

export default App;
