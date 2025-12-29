import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseFromApiCall = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Col md={5} lg={4}>
        <Card className="p-4">
          <Card.Body>
            <h2 className="fw-bold text-center mb-2">Welcome Back 👋</h2>
            <p className="text-muted text-center mb-4">
              Sign in to continue to your account
            </p>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <div className="position-relative">
                  <FaEnvelope
                    className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                  />
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
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
                  <FaLock
                    className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                  />
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
                variant="primary"
                className="w-100 py-2"
                disabled={isLoading}
              >
                Sign In
              </Button>

              {isLoading && <div className="mt-3 text-center"><Loader /></div>}
            </Form>

            <Row className="mt-4">
              <Col className="text-center">
                <span className="text-muted">New here?</span>{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Create an account
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
