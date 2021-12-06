import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientSide from "./components/ClientSide";
import DriverSide from "./components/DriverSide";
import DispatchSide from "./components/DispatchSide";
import rideServices from "./utilities/rideServices";
import Navigation from './components/Navigation'

const App = () => {
  
  //############   State Hooks   ###############
  // Rides holds a list of rides, updated from the server.
  const [rides, setRides] = useState([])

  // User input. Updated on change. Upon submit, formed into an object for 'rides'
  const [assignedDriver, setAssignedDriver] = useState(null);

  // Changes app in use (client, dispatch, driver). App will later be split into different apps.
  const [page, setPage] = useState(0);

  // alert is for ClientSide specifically.
  const [alert, setAlert] = useState(null);
  const [dispatchAlert, setDispatchAlert] = useState(null);

  //############   State Hooks   ###############

  // Drivers currently static. Eventually will account for dynamic.
  const drivers = ["432", "421"];

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

  // Array of service locations
  const locationsPlusCodes = {
    Classroom: "8C78+85",
    Downtown: "8C63+FG",
    Walmart: "8F25+MP",
  };

  const handlePageClick = (value) => {
    setPage(value);
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
    // Note to self: these are update operations.
    // Local time string
    const pickup = { 
      pickupTime: new Date(),
      status: [1, 'Driving to destination']
    }

    rideServices.update(id, pickup)
      .then(response => {
        console.log(response)
        getAllRides()
      })
  }
  
  const handleDropoff = (id) => {
    const dropoff = { 
      dropoffTime: new Date(),
      status: [2, 'Ride complete']
    }

    rideServices.update(id, dropoff)
      .then(response => {
        console.log(response)
        getAllRides()
      })
  }

  const handleNewRideSubmit = (event, rideObj) => {
    event.preventDefault();
    
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
  }

  return (
    <div>
      <Navigation handlePageClick={handlePageClick} />
      {page === 0 ? (
        <ClientSide
          locationsPlusCodes={locationsPlusCodes}
          handleNewRideSubmit={handleNewRideSubmit}
          handleDeleteRide={handleDeleteRide}
          alert={alert}
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
          rides={rides}
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
