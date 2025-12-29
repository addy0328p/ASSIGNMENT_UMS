import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import {
  FaUserShield,
  FaUserCircle,
  FaSignInAlt,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { logout } from "../../slices/adminAuthSlice";

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useAdminLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar
        expand="lg"
        variant="dark"
        className="shadow-sm"
        style={{ backgroundColor: "#020617" }}
        collapseOnSelect
      >
        <Container>
          {/* BRAND */}
          <LinkContainer to="/admin">
            <Navbar.Brand className="fw-bold fs-4 d-flex align-items-center gap-2">
              <FaUserShield />
              Compass
              <Badge bg="danger" className="ms-2">
                ADMIN
              </Badge>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {adminInfo && (
              <Nav className="me-auto ms-4 gap-2">
                <LinkContainer to="/admin">
                  <Nav.Link active={location.pathname === "/admin"}>
                    <FaChartBar className="me-1" />
                    Dashboard
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/admin/manage-users">
                  <Nav.Link
                    active={location.pathname.includes("manage-users")}
                  >
                    <FaUsers className="me-1" />
                    Users
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}

            {/* RIGHT SIDE */}
            <Nav className="ms-auto align-items-center gap-3">
              {adminInfo ? (
                <NavDropdown
                  align="end"
                  title={
                    <span className="d-flex align-items-center gap-2">
                      <FaUserCircle size={20} />
                      <span className="fw-semibold">{adminInfo.name}</span>
                    </span>
                  }
                  id="adminName"
                >
                  <LinkContainer to="/admin/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/admin/login">
                  <Nav.Link className="fw-semibold">
                    <FaSignInAlt className="me-1" />
                    Admin Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
