import Ride from "./Ride";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const DispatchSide = ({
  request,
  drivers,
  assignDriver,
  submitAssignDriver,
  alert,
}) => {
  return (
    <Container className={"border border-primary rounded"}>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
            <h1>Dispatch</h1>
          </Row>
          {request ? 
            <Row>
              <Col>
                <h2>Ride request:</h2>
                {request.pickup && request.dropoff ? (
                  <>
                    <Ride request={request}>
                      <Form onSubmit={submitAssignDriver}>
                        <Form.Select onChange={assignDriver}>
                          <option>Assign driver to ride</option>
                          {drivers.map((driver) => (
                            <option>{driver}</option>
                          ))}
                        </Form.Select>
                        <Button type='submit'>Assign driver</Button>
                      </Form>
                    </Ride>
                    {alert ?
                      <Alert variant={alert.variant}>{alert.value}</Alert>
                      : null
                    }
                  </>
                ) : (
                  "No current ride"
                )}
              </Col>
            </Row>
          : <p>No current rides </p>  
          }

          <Row>
            <h2>Available Drivers:</h2>
            {drivers.map((driver, i) => {
              return <p key={i}>{driver}</p>;
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DispatchSide;
