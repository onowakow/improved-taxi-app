import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AssignDriverForm = ({ id, driver, submitAssignDriver, assignDriver, drivers }) => {
  if (driver === undefined) {
    return (
      <Form onSubmit={(event) => submitAssignDriver(event, id)}>
        <Form.Select onChange={assignDriver}>
          <option>Assign driver to ride</option>
          {drivers.map((driver, i) => (
            <option key={i}>{driver}</option>
          ))}
        </Form.Select>
        <Button type="submit">Assign driver</Button>
      </Form>
    )
  } else {
    return null
  }
};

export default AssignDriverForm;
