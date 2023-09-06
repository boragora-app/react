import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Body from '../components/Body';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import TimeAgo from '../components/TimeAgo';
import Bookings from '../components/Bookings';
import BackButton from '../components/BackButton';
import { useApi } from '../contexts/ApiProvider';
import InputField from '../components/InputField';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../contexts/UserProvider';
// import { useFlash } from '../contexts/FlashProvider';


export default function BookingPage() {
  const { bookingid } = useParams();
  const [booking, setBooking] = useState();
  const api = useApi();
  const [formErrors, setFormErrors] = useState({});
  const nameField = useRef();
  const mileageField = useRef();
  const intervalField = useRef();
  const descField = useRef(null);
  const valueField = useRef();
  // const flash = useFlash();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };
  useEffect(() => {
    (async () => {
      const response = await api.get('/booking/' + bookingid);
      if (response.ok) {
        setBooking(response.body);
      }
      else {
        setBooking(null);
      }
    })();
  }, [bookingid, api]); //, loggedInBooking]);


  const onSubmit = async (ev) => {
    ev.preventDefault()

    const name = nameField.current.value
    const mileage = mileageField.current.value
    const interval = intervalField.current.value   
    const desc = descField.current.value
    const value = valueField.current.value

    const errors = {}
    if (!name) {
      errors.name = 'Informe a manutenção realizada'
    }
    if (!mileage) {
      errors.mileage = 'Informe a quilometragem no odêmetro'
    }
    if (!interval) {
      errors.interval = 'Informe o intervalo da manutenção'
    }
    if (!desc) {
      errors.desc = 'Descreva a manutenção com peças, valores e observações'
    }
    if (!value) {
      errors.desc = 'Informe o custo da manutenção.'
    }

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
   
    const result = await api.post('/booking', {
      booking: bookingid,
      name: nameField.current.value,
      mileage: mileageField.current.value,
      interval: intervalField.current.value,
      desc: descField.current.value,
      value: valueField.current.value,
    })
    if (!result.ok) {
      setFormErrors(result.body.errors.json)
    } else {
      setFormErrors({})
      navigate(`/booking/${result.body.id}`)
    }

  }

  return (
    <Body sidebar>

      {booking === undefined ?
        <Spinner animation="border" />
      :
        <>
          {booking === null ?
              <p>Agendamento não encontrado.</p>
            :   
              <>
                <h2>Manutenções | {booking.brand} - {booking.model} {booking.year}</h2>
                {booking.last_seen && 
                  <p>
                    Último agendamento: <TimeAgo isoDate={booking.last_seen * 1000} />
                  </p>}
                {booking.next_seen && 
                  <p>
                    Próximo agendamento: <TimeAgo isoDate={booking.next_seen * 1000} />
                  </p>}
                  <hr style={{ backgroundColor: 'black', height: '3px', width: '100%' }} />
                <BackButton />
                <Container className="PageBooking">
                  <Container>
                    <h3 style={{textAlign: "center" }}>Nova</h3>
                    <Form onSubmit={onSubmit}>
                      <InputField
                        name="name" label="Manutenção Realizada"
                        error={formErrors.name} fieldRef={nameField}
                      />
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <InputField
                            name="mileage" label="Km Atual"
                            error={formErrors.mileage} fieldRef={mileageField}
                          />
                        </Form.Group>
                        <Form.Group as={Col}>
                          <InputField
                            name="interval" label="Intervalo Km"
                            error={formErrors.interval} fieldRef={intervalField}
                          />
                        </Form.Group>
                        <Form.Group as={Col}>
                          <InputField
                            name="value" label="Custo"
                            error={formErrors.desc} fieldRef={valueField}
                          />
                        </Form.Group>
                      </Row>
                      <FloatingLabel name="desc" controlId={descField} label="Descrição">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{ height: '100px' }}
                          value={description}
                          onChange={handleDescriptionChange}
                          error={formErrors.desc}
                          ref={descField}
                        />
                      </FloatingLabel>
                      <Button style={{ display: 'flex', margin: '20px auto' }} variant="outline-success" type="submit">Salvar Manutenção</Button>
                    </Form>
                  </Container>
                  <Container>
                    <h3 style={{textAlign: "center" }}>Próximas</h3>
                    <Bookings content={booking.id} />
                  </Container>
                </Container>
              </>
          }
        </>
      }
    </Body>
  );
}