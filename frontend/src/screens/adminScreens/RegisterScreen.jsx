import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Badge } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaKey,
  FaUserShield,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useAdminRegisterMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminRegistrationKey, setAdminRegistrationKey] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [register, { isLoading }] = useAdminRegisterMutation();

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const responseFromApiCall = await register({
        name,
        email,
        password,
        adminRegistrationKey,
      }).unwrap();

      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Row
      className="justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <Col md={7} lg={6}>
        <Card className="p-4">
          <Card.Body>
            <div className="text-center mb-3">
              <FaUserShield size={44} className="text-danger mb-2" />
              <h2 className="fw-bold mb-1">Admin Registration</h2>
              <Badge bg="danger">Restricted Access</Badge>
            </div>

            <p className="text-muted text-center mb-4">
              Create an administrator account using a valid access code
            </p>

            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <div className="position-relative">
                      <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="text"
                        placeholder="Admin Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="ps-5"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <div className="position-relative">
                      <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="ps-5"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="ps-5"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="position-relative">
                      <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="ps-5"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Admin Registration Code</Form.Label>
                <div className="position-relative">
                  <FaKey className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="password"
                    placeholder="Enter secure admin access code"
                    value={adminRegistrationKey}
                    onChange={(e) => setAdminRegistrationKey(e.target.value)}
                    className="ps-5"
                    required
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                variant="danger"
                className="w-100 py-2"
                disabled={isLoading}
              >
                Create Admin Account
              </Button>

              {isLoading && (
                <div className="mt-3 text-center">
                  <Loader />
                </div>
              )}
            </Form>

            <Row className="mt-4">
              <Col className="text-center">
                <span className="text-muted">Already an admin?</span>{" "}
                <Link
                  to="/admin/login"
                  className="fw-semibold text-decoration-none text-danger"
                >
                  Sign in
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminRegisterScreen;
