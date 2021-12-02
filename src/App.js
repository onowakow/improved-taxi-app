import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ClientSide from "./components/ClientSide";
import DriverSide from "./components/DriverSide";
import DispatchSide from "./components/DispatchSide";

const App = () => {
  const requestInitialState = {
    rideId: undefined,
    riderName: undefined,
    pickupLocation: undefined,
    dropoffLocation: undefined,
    timeRequested: undefined,
    pickupTime: undefined,
    dropoffTime: undefined,
    driverAssigned: undefined,
  }
  

  // State hooks with names ending in 'value' represent dynamic (onChange) hooks
  const [pickupValue, setPickupValue] = useState("Classroom");
  const [dropoffValue, setDropoffValue] = useState("Classroom");
  // Request holds a single ride object.
  const [request, setRequest] = useState( requestInitialState );
  // Rides holds a list of rides, updated from the server.
  const [rides, setRides] = useState({ rides: [] })
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  // alert is for ClientSide specifically.
  const [alert, setAlert] = useState(null);
  const [dispatchAlert, setDispatchAlert] = useState(null);
  // Drivers currently static. Eventually will account for dynamic.
  const [drivers, setDrivers] = useState(["432", "421"]);
  // Holds a driver assignment until the form is submitted, adding the driver to a ride obj
  const [assignedDriver, setAssignedDriver] = useState(null);

  console.log('rides state:', rides);

  // loads all rides currently saved in server
  const loadRides = async () => {
    console.log('loadRides called')
    const query = `query {
      rideList {
        rideId riderName pickupLocation
        dropoffLocation timeRequested
        pickupTime dropoffTime driverAssigned
      }
    }`

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const result = await response.json();
    setRides({ rides: result.data.rideList })
  }

  // Calls once, similar to ComponentDidMount. Loads all rides.
  useEffect(() => {
    loadRides()
  }, [])

  // Array of service locations
  const locationsPlusCodes = {
    Classroom: "8C78+85",
    Downtown: "8C63+FG",
    Walmart: "8F25+MP",
  };

  // Non-mutating change to request obj. Returns new request obj. 
  const modifyValueOfRequestByPropertyValueObj = (propertyValueObj) => {
    const newRequest = Object.assign({}, request)
    for (const property in propertyValueObj) {
      newRequest[property] = propertyValueObj[property]
    }

    return newRequest
  }

  const handlePickupChange = (event) => {
    setPickupValue(event.target.value);
  };

  const handleDropoffChange = (event) => {
    setDropoffValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNewRideSubmit = (event) => {
    event.preventDefault();

    // Update request state by modifying blank template
    const newRequest = modifyValueOfRequestByPropertyValueObj({
      rideId: Math.floor(Math.random() * 10000) + 1,
      riderName: name,
      pickupLocation: pickupValue,
      dropoffLocation: dropoffValue,
    })
    setRequest(newRequest)

    // Concatinate Rides state. Holds list of rides (request holds single ride)
    setRides({ rides: rides.rides.concat(newRequest) })

    // Successful ride booking
    setAlert({
      variant: "success",
      value: "Your ride was successfully booked.",
    });
    setTimeout(() => setAlert(null), 5000);

  };

  const handlePageClick = (value) => {
    setPage(value);
  };

  const buttonStyle = {
    margin: "2%",
  };

  const assignDriver = (event) => {
    setAssignedDriver(event.target.value);
  };

  const submitAssignDriver = (event) => {
    event.preventDefault();
    if (!assignedDriver) {
      setDispatchAlert({
        variant: "danger",
        value: "No driver selected. Please assign a driver",
      });

      setTimeout(() => setDispatchAlert(null), 5000);
    } else {
      const driverObj = { driver: assignedDriver };
      const requestCopy = Object.assign({}, request, driverObj);
      console.log("requestCopy", requestCopy);
      setRequest(requestCopy);
    }
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container className="d-flex flex-row justify-content-start">
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={() => handlePageClick(0)}
          >
            Taxi
          </Button>

          <Button
            style={buttonStyle}
            variant="outline-info"
            onClick={() => handlePageClick(1)}
          >
            Dispatch
          </Button>

          <Button
            style={buttonStyle}
            variant="outline-info"
            onClick={() => handlePageClick(2)}
          >
            Driver
          </Button>
        </Container>
      </Navbar>
      {page === 0 ? (
        <ClientSide
          pickupValue={pickupValue}
          dropoffValue={dropoffValue}
          locationsPlusCodes={locationsPlusCodes}
          handlePickupChange={handlePickupChange}
          handleDropoffChange={handleDropoffChange}
          handleSubmit={handleNewRideSubmit}
          handleNameChange={handleNameChange}
          alert={alert}
          request={request}
        />
      ) : page === 1 ? (
        <DispatchSide
          rides={rides.rides}
          drivers={drivers}
          assignDriver={assignDriver}
          submitAssignDriver={submitAssignDriver}
          alert={dispatchAlert}
        />
      ) : page === 2 ? (
        <DriverSide />
      ) : (
        <p>Error: no page selected</p>
      )}
    </div>
  );
};

export default App;
