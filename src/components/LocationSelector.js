import Form from 'react-bootstrap/Form'

const LocationSelector = ({ locations, handleChange, value }) => {
  return (
    <>
    <Form.Select value={value} onChange={handleChange}>
        {locations.map((location, i) => (
          <option key={i} value={location}>
            {location}
          </option>
        ))}
    </Form.Select>
    <Form.Text>Select a location from the drop-down menu.
      We are unable to pickup from locations not in this list.
    </Form.Text>
    </>
  );
};

export default LocationSelector