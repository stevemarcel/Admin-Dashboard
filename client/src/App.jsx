import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import MenuBar from "./components/MenuBar";

const App = () => {
  return (
    <>
      <MenuBar />
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
