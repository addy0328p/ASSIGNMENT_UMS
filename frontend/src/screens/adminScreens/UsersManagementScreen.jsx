import { useEffect, useState } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";

import UsersDataTable from "../../components/AdminComponents/UserDataTable";
import { useGetUsersDataMutation } from "../../slices/adminApiSlice";
import Loader from "../../components/Loader";

const AdminHomeScreen = () => {
  const [usersData, setUsersData] = useState([]);

  const [usersDataFromAPI, { isLoading }] =
    useGetUsersDataMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFromApiCall = await usersDataFromAPI();
        setUsersData(responseFromApiCall.data.usersData);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error(error);
      }
    };

    fetchData();
  }, [usersDataFromAPI]);

  const totalUsers = usersData.length;

  return (
    <>
      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Admin Dashboard</h2>
        <p className="text-muted">
          Manage users and monitor system activity
        </p>
      </div>

      {/* STATS CARDS */}
      <Row className="mb-4">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                }}
              >
                <FaUsers />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Users</h6>
                <h4 className="fw-bold mb-0">{totalUsers}</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card>
            <Card.Body className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                }}
              >
                <FaUserCheck />
              </div>
              <div>
                <h6 className="text-muted mb-1">Status</h6>
                <Badge bg="success">System Active</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* USERS TABLE */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">Users List</h5>
        </Card.Header>

        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <Loader />
            </div>
          ) : (
            <UsersDataTable users={usersData} />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminHomeScreen;
