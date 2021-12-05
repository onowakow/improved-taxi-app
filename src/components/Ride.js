import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Ride = ({ request, children, handleDeleteRide }) => {
  /* props isClient, isDriver are booleans which change how much information is shown in ride object.
    Dispatch does not have equivalent because it is assumed to display all ride information 
  */

  const rideStyle = {
    padding: '5px'
  }
  
  return (
    <>
    {/* Check that request is not empty */}
    {request ? 
      <Card style={rideStyle} className={'border border-secondary rounded'}>
        <Card.Body>
          <Card.Title>
            Ride for {request.riderName}
          </Card.Title>
          <Card.Text>
            Pickup at: {request.pickupLocation}
          </Card.Text>
          <Card.Text>Dropoff at: {request.dropoffLocation}</Card.Text>
          {request.driver ? (
            <Card.Text>Driver {request.driver} assigned to ride</Card.Text>
          ) : (
            <Card.Text>No driver assigned</Card.Text>
          )}
          {/* Wrapper contents below */}
          <div>
            {children}
          </div>
          <Button variant='danger' onClick={() => handleDeleteRide(request.rideId)}>Cancel Ride</Button>
        </Card.Body>
      </Card>
    : null }
    </>
  );
};

export default Ride