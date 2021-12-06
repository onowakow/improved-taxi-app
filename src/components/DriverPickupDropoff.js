import Button from 'react-bootstrap/Button'

const DriverPickupDropoff = ({ pickupTime, dropoffTime, handlePickup, handleDropoff, id }) => {
  return pickupTime === null && dropoffTime === null
    ? <Button variant={'primary'} onClick={()=>handlePickup(id)}>Pick up rider</Button>
    : dropoffTime === null
      ? <Button variant={'primary'} onClick={()=>handleDropoff(id)}>Drop off rider</Button>
      : null

}

export default DriverPickupDropoff