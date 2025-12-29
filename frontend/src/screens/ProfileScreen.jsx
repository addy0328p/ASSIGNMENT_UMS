import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/userApiSlice";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { PROFILE_IMAGE_DIR_PATH } from "../utils/constants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (profileImage) formData.append("profileImage", profileImage);

      const responseFromApiCall = await updateProfile(formData).unwrap();

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
              {userInfo.profileImageName ? (
                <img
                  src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
                  alt={userInfo.name}
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#e5e7eb",
                    color: "#475569",
                    fontSize: "42px",
                  }}
                >
                  <FaUser />
                </div>
              )}

              <h3 className="fw-bold mb-1">My Profile</h3>
              <p className="text-muted mb-0">
                Update your personal information
              </p>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div className="position-relative">
                  <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ps-5"
                    required
                  />
                </div>
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

              <Form.Group className="mb-3">
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

              <Form.Group className="mb-4">
                <Form.Label>Profile Picture</Form.Label>
                <div className="position-relative">
                  <FaCamera className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                  <Form.Control
                    type="file"
                    className="ps-5"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
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

export default ProfileScreen;
