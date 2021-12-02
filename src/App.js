import React, { useState } from "react";
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
  // Request holds a full request object
  const [request, setRequest] = useState(requestInitialState);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  // alert is for ClientSide specifically.
  const [alert, setAlert] = useState(null);
  const [dispatchAlert, setDispatchAlert] = useState(null);
  // Drivers currently static. Eventually will account for dynamic.
  const [drivers, setDrivers] = useState(["432", "421"]);
  // Holds a driver assignment until the form is submitted, adding the driver to a ride obj
  const [assignedDriver, setAssignedDriver] = useState(null);

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

    

    const newRequest = modifyValueOfRequestByPropertyValueObj({
      rideId: Math.floor(Math.random() * 10000) + 1,
      riderName: name,
      pickupLocation: pickupValue,
      dropoffLocation: dropoffValue,
    })

    setRequest(newRequest)

    /*
    // Copy request
    const newReq = Object.assign({}, request)
    // Modify copy to include new information
    newReq.rideId = Math.floor(Math.random() * 10000) + 1
    newReq.riderName = name
    newReq.pickupLocation = pickupValue
    newReq.dropoffLocation = dropoffValue

    setRequest(newReq)
    */

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
          request={request}
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
