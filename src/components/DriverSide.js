import Ride from './Ride'
import DriverPickupDropoff from './DriverPickupDropoff';

const DriverSide = ({ rides, handleDeleteRide, handlePickup, handleDropoff }) => {
  return (
    <div>
      <h1>Driver</h1>
      {rides.map(ride => {
        return (
          <Ride driver={ride.driver} key={ride.rideId} request={ride} handleDeleteRide={handleDeleteRide}>
            <DriverPickupDropoff 
              id={ride.rideId}
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
};

export default DriverSide;
