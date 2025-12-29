import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
      }).unwrap();

      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Col md={6} lg={5}>
        <Card className="p-4">
          <Card.Body>
            <h2 className="fw-bold text-center mb-2">Create your account ✨</h2>
            <p className="text-muted text-center mb-4">
              Join Compass and start managing your account
            </p>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div className="position-relative">
                  <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ps-5"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <div className="position-relative">
                  <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
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

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-5"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
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

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2"
                disabled={isLoading}
              >
                Create Account
              </Button>

              {isLoading && <div className="mt-3 text-center"><Loader /></div>}
            </Form>

            <Row className="mt-4">
              <Col className="text-center">
                <span className="text-muted">Already have an account?</span>{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
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

export default RegisterScreen;
