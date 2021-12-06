import ManualRideEntry from "./ManualRideEntry";

const ClientSide = ({
  locationsPlusCodes,
  alert,
  handleNewRideSubmit,
  handleDeleteRide
}) => {
  return (
    <ManualRideEntry alert={alert} locationsPlusCodes={locationsPlusCodes} 
          handleNewRideSubmit={handleNewRideSubmit}
    />
    
  );
};

export default ClientSide;
