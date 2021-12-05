import Ride from "./Ride";
// Extra info pertaining to dispatch. a child of ride
import DispatchRideInfo from "./DispatchRideInfo";
import AssignDriverForm from './AssignDriverForm'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const DispatchSide = ({
  rides,
  drivers,
  assignDriver,
  submitAssignDriver,
  alert,
  handleDeleteRide
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
                    {rides.map((ride) => (
                      <div key={ride.rideId}>
                        <Ride request={ride} handleDeleteRide={handleDeleteRide}>
                          <>
                            <DispatchRideInfo pickupTime={ride.pickupTime} dropoffTime={ride.dropoffTime} />
                            <AssignDriverForm 
                              id={ride.rideId}
                              driver={ride.driver}
                              submitAssignDriver={submitAssignDriver}
                              assignDriver={assignDriver}
                              drivers={drivers}
                            />
                          </>
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
        </Col>
      </Row>
    </Container>
  );
};

export default DispatchSide;
