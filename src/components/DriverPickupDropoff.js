import Button from 'react-bootstrap/Button'

const DriverPickupDropoff = ({ pickupTime, dropoffTime, handlePickup, handleDropoff, id }) => {
  return pickupTime === undefined && dropoffTime === undefined
    ? <Button variant={'primary'} onClick={()=>handlePickup(id)}>Pick up rider</Button>
    : dropoffTime === undefined
      ? <Button variant={'primary'} onClick={()=>handleDropoff(id)}>Drop off rider</Button>
      : null

}

export default DriverPickupDropoff