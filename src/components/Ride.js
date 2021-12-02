import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Ride = ({ request, children, isDriver, isDispatch }) => {
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
            Ride for customer {request.riderName}
          </Card.Title>
          <Card.Text>
            Pickup at: {request.pickupLocation}
          </Card.Text>
          <Card.Text>Dropoff at: {request.dropoffLocation}</Card.Text>
          {/* Conditional rendering for driver and dispatch */}
          {isDriver ? (
            <Card.Text></Card.Text>
          ) : isDispatch ? (
            <>
            </>
          ) : (<></>)}
          {/* Wrapper contents below */}
          <div>
            {children}
          </div>
          <Button variant='danger'>Cancel Ride</Button>
        </Card.Body>
      </Card>
    : null }
    </>
  );
};

export default Ride