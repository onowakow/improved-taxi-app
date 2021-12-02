import LocationSelector from "./LocationSelector";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Ride from "./Ride";
import Alert from "react-bootstrap/Alert";

const ClientSide = ({
  handlePickupChange,
  handleDropoffChange,
  handleNameChange,
  handleSubmit,
  pickupValue,
  dropoffValue,
  locationsPlusCodes,
  alert,
  request,
}) => {
  const locations = Object.keys(locationsPlusCodes);

  const formStyle = {
    padding: "2%",
  };

  const formGroupStyle = {
    paddingBottom: "1%",
  };

  const mainContainerStyle = {
    paddingTop: "1%",
  };

  return (
    <Container
      style={mainContainerStyle}
      className={"d-flex flex-column justify-content-center"}
    >
      <Row>
        <h1>Request a ride</h1>
      </Row>

      <Row>
        <Col xs={11} sm={10} md={8} lg={6}>
          {/* Check if a ride has already been created by this user.
          if so, do not allow form to be refilled. */}
          {request.rideId ? (
            <p>Thank you for requesting a ride.</p>
          ) : (
            <Form
              style={formStyle}
              onSubmit={handleSubmit}
              className={"border border-primary rounded"}
            >
              <Form.Group
                style={formGroupStyle}
                controlId="formPersonName"
                onChange={handleNameChange}
              >
                <Form.Label>Please enter your name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group style={formGroupStyle} controlId="formPickupSelector">
                <Form.Label>Pick-up location</Form.Label>
                <LocationSelector
                  value={pickupValue}
                  handleChange={handlePickupChange}
                  locations={locations}
                />
              </Form.Group>

              <Form.Group
                style={formGroupStyle}
                controlId="formDropoffSelector"
              >
                <Form.Label>Drop-off location</Form.Label>
                <LocationSelector
                  value={dropoffValue}
                  handleChange={handleDropoffChange}
                  locations={locations}
                />
              </Form.Group>

              <div>
                <input type="submit" />
              </div>
            </Form>
          )}
        </Col>
        <Col>
          <Ride request={request} />
        </Col>
      </Row>

      {/*Alert is shown below if not null*/}
      <Row>
        {alert ? <Alert variant={alert.variant}>{alert.value}</Alert> : null}
      </Row>
    </Container>
  );
};

export default ClientSide;
