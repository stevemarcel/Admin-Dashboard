import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" d-flex justify-content-center">
      <div className="card hero-card w-75">
        <div className="card-body d-flex flex-column align-items-center">
          <h2>Admin Dashboard</h2>
          <p className="card-text text-center">
            In response to the growing need for streamlined administrative processes, in this
            project I have developed a sophisticated Frontend Admin Dashboard, providing
            administrators with a powerful interface to view and manage user data. This project
            utilizes cutting-edge technologies, including React, Redux Toolkit, React-Bootstrap,
            React Icons, and React-Toastify, to deliver a seamless user experience.
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
