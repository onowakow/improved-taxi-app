import Card from 'react-bootstrap/Card'

const DispatchRideInfo = ({ pickupTime, dropoffTime }) => {
  
  // Respond to ride status
  if (!pickupTime) {
    return <Card.Text>Status: Rider awaiting pick-up</Card.Text>
  }
  if (pickupTime && !dropoffTime) {
    const datePickupTime = new Date(pickupTime)
    return (
      <>
        <Card.Text>Pick-up time: {datePickupTime.toLocaleTimeString()}</Card.Text>
        <Card.Text>Status: Rider awaiting drop-off</Card.Text>
      </>
    )
  }
  if (pickupTime && dropoffTime) {
    const datePickupTime = new Date(pickupTime)
    const dateDropoffTime = new Date(dropoffTime)
    return (
      <>
        <Card.Text>Pick-up time: {datePickupTime.toLocaleTimeString()}</Card.Text>
        <Card.Text>Drop-off time: {dateDropoffTime.toLocaleTimeString()}</Card.Text>
        <Card.Text>Status: <b>Ride complete</b></Card.Text>
      </>
    ) 
  } else {
    return null
  }
}

export default DispatchRideInfo