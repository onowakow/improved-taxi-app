import { useState } from 'react'
import Ride from './Ride'
import DriverPickupDropoff from './DriverPickupDropoff';
import Alert from 'react-bootstrap/Alert'

const DriverSide = ({ rides, handleDeleteRide, handlePickup, handleDropoff }) => {
  //const [alert, setAlert] = useState[null]
  // Filter rides to only include those that are new [0] or in progress [1]
  // The numbers above refer to num = ride.status[0]. num = 0 is new, num = 1 is in progress, num = 2 is completed
  const incompleteRides = rides.filter(ride => ride.status[0] !== 2)

  // Only render rides if they exist
  if (incompleteRides.length !== 0) {
    return (
      <div>
        <h1>Driver</h1>
        {incompleteRides.map(ride => {
          const id = ride.rideId
          return (
            <Ride driver={ride.driver} key={id} ride={ride} handleDeleteRide={() => handleDeleteRide(id)}>
              <DriverPickupDropoff 
                id={id}
                pickupTime={ride.pickupTime} 
                dropoffTime={ride.dropoffTime}
                handlePickup={handlePickup}
                handleDropoff={handleDropoff}
              />
            </Ride>
          )
        })}
      </div>
    );
  } else {
    return <p>No current rides</p>
  }
};

export default DriverSide;
