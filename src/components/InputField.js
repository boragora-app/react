import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
export default function InputField(
  { name, label, type, error, fieldRef }
) {

  return (
    type === 'hidden' ?  <Form.Control type={type || 'text'} placeholder='' ref={fieldRef} /> :
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