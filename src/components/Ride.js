import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Ride = ({ request, children }) => {
  const rideStyle = {
    padding: '5px'
  }
  
  return (
    <>
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