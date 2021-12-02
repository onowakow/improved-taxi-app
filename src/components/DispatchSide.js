import Ride from "./Ride";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const DispatchSide = ({
  rides,
  drivers,
  assignDriver,
  submitAssignDriver,
  alert,
}) => {
  return (
    <Container className={"border border-primary rounded"}>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
            <h1>Dispatch</h1>
          </Row>
          {
            /*If there are rides, render list*/ rides ? (
              <Row>
                <Col>
                  <h2>All rides:</h2>
                  <>
                    {/* Map rides, displaying each ride with an assign driver form. */}
                    {rides.map(ride => (
                      <div key={ride.rideId}>
                        <Ride request={ride} isDriver={false} isDispatch={true}>
                          <Form onSubmit={submitAssignDriver}>
                            <Form.Select onChange={assignDriver}>
                              <option>Assign driver to ride</option>
                              {drivers.map((driver, i) => (
                                <option key={i}>{driver}</option>
                              ))}
                            </Form.Select>
                            <Button type="submit">Assign driver</Button>
                          </Form>
                        </Ride>
                        {alert ? (
                          <Alert variant={alert.variant}>{alert.value}</Alert>
                        ) : null}
                      </div>
                    ))}
                  </>
                </Col>
              </Row>
            ) : (
              <p>No current rides </p>
            )
          }

          <Row>
            <h2>Available Drivers:</h2>
            {drivers.map((driver, i) => {
              return <p key={i}>{driver}</p>;
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DispatchSide;
