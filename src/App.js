import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ClientSide from "./components/ClientSide";
import DriverSide from "./components/DriverSide";
import DispatchSide from "./components/DispatchSide";
import axios from 'axios'
import rideServices from "./utilities/rideServices";

const baseUrl = 'http://localhost:3002/api/rides'

const App = () => {
  const requestInitialState = {
    rideId: undefined,
    riderName: undefined,
    pickupLocation: undefined,
    dropoffLocation: undefined,
    timeRequested: undefined,
    pickupTime: undefined,
    dropoffTime: undefined,
    driver: undefined,
  }
  
  //############   State Hooks   ###############
  // Rides holds a list of rides, updated from the server.
  const [rides, setRides] = useState([])

  // User input. Updated on change. Upon submit, formed into an object for 'rides'
  const [pickupValue, setPickupValue] = useState("Classroom");
  const [dropoffValue, setDropoffValue] = useState("Classroom");
  const [name, setName] = useState("");
  const [assignedDriver, setAssignedDriver] = useState(null);

  // Request holds a single ride object for client app
  const [request, setRequest] = useState( requestInitialState );

  // Changes app in use (client, dispatch, driver). App will later be split into different apps.
  const [page, setPage] = useState(0);

  // alert is for ClientSide specifically.
  const [alert, setAlert] = useState(null);
  const [dispatchAlert, setDispatchAlert] = useState(null);

  //############   State Hooks(end)   ###############

  // Drivers currently static. Eventually will account for dynamic.
  const drivers = ["432", "421"];

  console.log(rides)

  const getAllRides = () => {
    rideServices.getAll()
      .then(response => {
        setRides(response.data)
      })
  }

  // Using getAllRides() in here leads to 'missing dependency' error. Research has yet to turn up why. 
  useEffect(() => {
    rideServices.getAll()
      .then(response => {
        setRides(response.data)
      })
  }, [])

  const copyRideById = (id) => {
    const ride = rides.find(ride => ride.rideId === id)
    return ride
  }

  // Array of service locations
  const locationsPlusCodes = {
    Classroom: "8C78+85",
    Downtown: "8C63+FG",
    Walmart: "8F25+MP",
  };

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

    const rideObj = {
      riderName: name,
      pickupLocation: pickupValue,
      dropoffLocation: dropoffValue
    }
    
    rideServices.create(rideObj)
      .then(response => {
        console.log(response)
      })

    getAllRides()

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

  const submitAssignDriver = (event, id) => {
    event.preventDefault();
    // Check if default option of dropdown was chosen
    if (!assignedDriver) {
      setDispatchAlert({
        variant: "danger",
        value: "No driver selected. Please assign a driver",
      });

      setTimeout(() => setDispatchAlert(null), 5000);
    } else {
      const driverObj = {driver: assignedDriver}
      rideServices.update(id, driverObj)
        .then(response => {
          console.log(response)
        })
      
      getAllRides()

    }
  };

  const handleDeleteRide = (id) => {
    rideServices.destroy(id)
      .then(response => {
        console.log(response)
        getAllRides()
      })
  }

  // pickup work here
  const handlePickup = (id) => {
    // Local time string
    const pickup = { pickupTime: new Date().toLocaleTimeString()}

    // Copy ride by id
    const rideCopy = copyRideById(id)
    const updatedRide = Object.assign({}, rideCopy, pickup)

    // Replace old ride with new ride in array
    const updatedRideArray = rides.rides.map(ride => ride.rideId === id 
      ? updatedRide
      : ride)

    // Update state
    setRides({ rides: updatedRideArray})
  }
  
  const handleDropoff = (id) => {
    console.log('handleDropoff called')
    const dropoff = { dropoffTime: new Date().toLocaleTimeString()}

    const rideCopy = copyRideById(id)
    const updatedRide = Object.assign({}, rideCopy, dropoff)

    // Replace old ride with new ride
    const updatedRideArray = rides.rides.map(ride => ride.rideId === id
      ? updatedRide 
      : ride)
    
    // Update state
    setRides({rides: updatedRideArray})
  }

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
          rides={rides}
          drivers={drivers}
          assignDriver={assignDriver}
          submitAssignDriver={submitAssignDriver}
          alert={dispatchAlert}
          handleDeleteRide={handleDeleteRide}
        />
      ) : page === 2 ? (
        <DriverSide 
          handleDeleteRide={handleDeleteRide}
          rides={rides.rides}
          handlePickup={handlePickup}
          handleDropoff={handleDropoff}
        />
      ) : (
        <p>Error: no page selected</p>
      )}
    </div>
  );
};

export default App;
