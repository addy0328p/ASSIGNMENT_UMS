import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
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
        style={{ backgroundColor: "#0f172a" }}
        collapseOnSelect
      >
        <Container>
          {/* BRAND */}
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-4">
              Compass<span className="text-primary ms-1">User</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-3">
              {userInfo ? (
                /* LOGGED IN USER */
                <NavDropdown
                  align="end"
                  id="user-menu"
                  title={
                    <span className="d-flex align-items-center gap-2">
                      <FaUserCircle size={20} />
                      <span className="fw-semibold">{userInfo.name}</span>
                    </span>
                  }
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item
                      active={location.pathname === "/profile"}
                    >
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                /* GUEST USER */
                <>
                  <LinkContainer to="/login">
                    <Nav.Link
                      active={location.pathname === "/login"}
                      className="fw-semibold"
                    >
                      <FaSignInAlt className="me-1" />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link
                      className="btn btn-primary px-3 text-white fw-semibold"
                      active={location.pathname === "/register"}
                    >
                      Sign Up
                    </Nav.Link>
                  </LinkContainer>

                  {/* ADMIN LINK */}
             <LinkContainer to="/admin/login">
  <Nav.Link
    className="fw-bold"
    style={{
      fontSize: "0.9rem",
      color: "#ef4444", // red-500
    }}
  >
    Are you an admin?
  </Nav.Link>
</LinkContainer>

                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
