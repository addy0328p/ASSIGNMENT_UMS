import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-4"
      style={{ minHeight: "120px" }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span className="mt-3 text-muted fw-semibold">{text}</span>
    </div>
  );
};

export default Loader;
