import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Navigation = ({ handlePageClick }) => {
  const buttonStyle = {
    margin: "2%",
  };
  
  return (
    <Navbar bg="light" variant="light">
      <Container className="d-flex flex-row justify-content-start">
        <Button
          style={buttonStyle}
          variant="primary"
          onClick={() => handlePageClick(0)}
        >
          Taxi
        </Button>

        <Button
          style={buttonStyle}
          variant="outline-info"
          onClick={() => handlePageClick(1)}
        >
          Dispatch
        </Button>

        <Button
          style={buttonStyle}
          variant="outline-info"
          onClick={() => handlePageClick(2)}
        >
          Driver
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navigation
