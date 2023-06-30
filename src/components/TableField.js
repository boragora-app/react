import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


export default function InputField(
  { name, label, type, error, fieldRef }
) {
  return (
    <FloatingLabel
      controlId={name}
      label={label}
      className="mb-2"
    >
      <Form.Control type={type || 'text'} placeholder='' ref={fieldRef} />
      <Form.Text className="text-danger">{error}</Form.Text>
    </FloatingLabel>
  );
}
