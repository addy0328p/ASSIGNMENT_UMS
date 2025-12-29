import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseFromApiCall = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Row
      className="justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Col md={6} lg={5}>
        <Card className="p-4">
          <Card.Body>
            <div className="text-center mb-3">
              <FaUserShield size={42} className="text-danger mb-2" />
              <h2 className="fw-bold mb-1">Admin Login</h2>
              <Badge bg="danger">Restricted Access</Badge>
            </div>

            <p className="text-muted text-center mb-4">
              Sign in to manage users and system settings
            </p>

            <Form onSubmit={submitHandler}>
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

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                Enter Admin Panel
              </Button>

              {isLoading && (
                <div className="mt-3 text-center">
                  <Loader />
                </div>
              )}
            </Form>

            <Row className="mt-4">
              <Col className="text-center">
                <span className="text-muted">
                  Have admin registration access?
                </span>{" "}
                <Link
                  to="/admin/register"
                  className="fw-semibold text-decoration-none text-danger"
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
