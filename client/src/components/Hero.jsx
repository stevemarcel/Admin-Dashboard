import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" d-flex justify-content-center">
      <div className="card hero-card w-75">
        <div className="card-body d-flex flex-column align-items-center">
          <h2>Admin Dashboard</h2>
          <p className="card-text text-center">
            My name is Stephen Onyejuluwa. This is my Admin Dashboard assignment for my application
            process for the Frontend Internship at HireQuotient.
          </p>
          <p className="card-text text-center">
            Click the button below to view the admin dashboard.
          </p>
          <div className="d-flex">
            <LinkContainer to="/admin">
              <Button variant="dark" className="me-3">
                Admin Dashboard
              </Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
