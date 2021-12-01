import ClientSide from "./ClientSide";
import DispatchSide from './DispatchSide';
import DriverSide from './DriverSide'

// Defunct component. Seemed unnecessary. Will delete when needed.

const ActivePage = (props) => {
  const page = props.page
  if (page === 0) {
    return (
      <ClientSide
          locationsPlusCodes={props.locationsPlusCodes}
          pickupValue={props.pickupValue}
          dropoffValue={props.dropoffValue}
          handlePickupChange={props.handlePickupChange}
          handleDropoffChange={props.handleDropoffChange}
          handleSubmit={props.handleSubmit}
          handleNameChange={props.handleNameChange}
        />
    )
  }
  
  else if (page === 1) {
    return (
      <DispatchSide request={props.request} drivers={props.drivers} />
    )
  }
  else if (page === 2) {
    return (
      <DriverSide request={props.request} />
    )
  }

  return (
    <div>Error: No page selected!</div>
  )
}

export default ActivePage