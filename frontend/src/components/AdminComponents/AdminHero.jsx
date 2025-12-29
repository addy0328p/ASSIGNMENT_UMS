import { Container, Card, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserShield, FaUsers, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminHero = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card
          className="p-5 text-center"
          style={{
            maxWidth: "720px",
            width: "100%",
            borderRadius: "16px",
          }}
        >
          {adminInfo ? (
            <>
              {/* ICON */}
              <div className="mb-3">
                <FaUserShield size={48} className="text-danger" />
              </div>

              {/* TITLE */}
              <h2 className="fw-bold mb-2">
                Welcome back, {adminInfo.name}
              </h2>

              <p className="text-muted mb-1">
                Logged in as administrator
              </p>

              <Badge bg="danger" className="mb-4">
                ADMIN ACCESS
              </Badge>

              {/* ACTIONS */}
              <div className="d-flex justify-content-center gap-3">
                <LinkContainer to="/admin/manage-users">
                  <Button variant="danger" size="lg">
                    <FaUsers className="me-2" />
                    Manage Users
                  </Button>
                </LinkContainer>
              </div>
            </>
          ) : (
            <>
              {/* ICON */}
              <div className="mb-3">
                <FaUserShield size={48} className="text-secondary" />
              </div>

              {/* TITLE */}
              <h2 className="fw-bold mb-2">Compass Admin Panel</h2>

              <p className="text-muted mb-4">
                Please sign in to access administrative controls
              </p>

              {/* ACTION */}
              <div className="d-flex justify-content-center">
                <LinkContainer to="/admin/login">
                  <Button variant="primary" size="lg">
                    <FaSignInAlt className="me-2" />
                    Admin Login
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default AdminHero;
