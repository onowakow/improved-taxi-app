import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Ride = ({ ride, children, handleDeleteRide }) => {
  const status = ride.status[1]

  if (ride) {
    return (
      <Card className={"border border-secondary rounded"}>
        <Card.Header as="h5">{status}</Card.Header>
        <Card.Body>
          <Card.Title>Ride for {ride.riderName}</Card.Title>
          <Card.Text>Pickup at: {ride.pickupLocation}</Card.Text>
          <Card.Text>Dropoff at: {ride.dropoffLocation}</Card.Text>
          {ride.driver ? (
            <Card.Text>Driver {ride.driver} assigned to ride</Card.Text>
          ) : (
            <Card.Text>No driver assigned</Card.Text>
          )}

          {/* Wrapper contents below */}
          <div>{children}</div>
          <Button
            variant="danger"
            onClick={() => handleDeleteRide(ride.rideId)}
          >
            Cancel Ride
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return <p>No rides found</p>
};

export default Ride;
