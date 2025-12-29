import { Container, Card, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserCircle, FaUserEdit, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { PROFILE_IMAGE_DIR_PATH } from "../utils/constants";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
          {userInfo ? (
            <>
              {/* PROFILE IMAGE / ICON */}
              <div className="mb-3">
                {userInfo.profileImageName ? (
                  <img
                    src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
                    alt={userInfo.name}
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaUserCircle size={80} className="text-secondary" />
                )}
              </div>

              {/* TEXT */}
              <h2 className="fw-bold mb-1">
                Welcome back, {userInfo.name}
              </h2>

              <p className="text-muted mb-2">{userInfo.email}</p>

              <Badge bg="primary" className="mb-4">
                USER ACCOUNT
              </Badge>

              {/* ACTION */}
              <div className="d-flex justify-content-center">
                <LinkContainer to="/profile">
                  <Button variant="primary" size="lg">
                    <FaUserEdit className="me-2" />
                    Manage Profile
                  </Button>
                </LinkContainer>
              </div>
            </>
          ) : (
            <>
              {/* ICON */}
              <div className="mb-3">
                <FaUserCircle size={80} className="text-secondary" />
              </div>

              {/* TEXT */}
              <h2 className="fw-bold mb-2">Compass User Portal</h2>

              <p className="text-muted mb-4">
                Please sign in to access your dashboard
              </p>

              {/* ACTION */}
              <div className="d-flex justify-content-center">
                <LinkContainer to="/login">
                  <Button variant="primary" size="lg">
                    <FaSignInAlt className="me-2" />
                    Login
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

export default Hero;
