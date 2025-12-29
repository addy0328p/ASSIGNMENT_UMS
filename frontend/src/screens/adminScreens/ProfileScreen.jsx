import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/adminAuthSlice";
import { useUpdateAdminMutation } from "../../slices/adminApiSlice";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminAuth);

  const [updateProfile, { isLoading }] = useUpdateAdminMutation();

  useEffect(() => {
    setName(adminInfo.name);
    setEmail(adminInfo.email);
  }, [adminInfo.name, adminInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const responseFromApiCall = await updateProfile({
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...responseFromApiCall }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Body className="p-4">
            {/* HEADER */}
            <div className="text-center mb-4">
              <FaUserShield size={40} className="text-danger mb-2" />
              <h3 className="fw-bold mb-1">Admin Profile</h3>
              <p className="text-muted mb-0">
                Update your administrator details
              </p>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Admin name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="position-relative">
                  <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ps-5"
                    required
                  />
                </div>
              </Form.Group>

              <hr className="my-4" />

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div className="position-relative">
                  <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <div className="position-relative">
                  <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="ps-5"
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                variant="danger"
                className="w-100 py-2"
                disabled={isLoading}
              >
                Save Changes
              </Button>

              {isLoading && (
                <div className="mt-3 text-center">
                  <Loader />
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminProfileScreen;
