import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Body from '../components/Body';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import TimeAgo from '../components/TimeAgo';
import Repairs from '../components/Repairs';
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


export default function CarPage() {
  const { carid } = useParams();
  const [car, setCar] = useState();
  const api = useApi();
  const [formErrors, setFormErrors] = useState({});
  const [action, setAction] = useState(['Nova', 'outline-success', 'Salvar Manutenção']);
  const repairidField = useRef();
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
      const response = await api.get('/car/' + carid);
      if (response.ok) {
        setCar(response.body);

        // if (response.body.carid !== loggedInCar.carid) {
        //   const follower = await api.get(
        //     '/me/following/' + response.body.id);
        //   if (follower.status === 204) {
        //     setIsFollower(true);
        //   }
        //   else if (follower.status === 404) {
        //     setIsFollower(false);
        //   }
        // }
        // else {
        //   setIsFollower(null);
        // }
      }
      else {
        setCar(null);
      }
    })();
  }, [carid, api]); //, loggedInCar]);

  const copyRepair = (r => {
    setAction(['Nova', 'outline-success', 'Salvar Manutenção'])
    repairidField.current.value = ""
    nameField.current.value = r.name || ""
    mileageField.current.value = r.mileage || ""
    intervalField.current.value = r.interval || ""
    descField.current.value = r.desc || ""
    valueField.current.value = r.value || ""
  })
  const editRepair = (r, n=false) => {
    setAction(['Editar', 'outline-warning', 'Editar Reparo', 'true'])
    // if (n) {
    //   repairidField.current.value = ""
    // } else {
    repairidField.current.value = r.id
    // }
    nameField.current.value = r.name || ""
    mileageField.current.value = r.mileage || ""
    intervalField.current.value = r.interval || ""
    descField.current.value = r.desc || ""
    valueField.current.value = r.value || ""
  };

  function handleCancel() {
    setAction(['Nova', 'outline-success', 'Salvar Manutenção'])
    repairidField.current.value = '';
    nameField.current.value = '';
    mileageField.current.value = '';
    intervalField.current.value = '';
    descField.current.value = '';
    valueField.current.value = '';
    nameField.current.focus();
  }

  const checkRepairForm = () => {
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
      return false
    }
    return true
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (checkRepairForm) {
      try {
        const result = await api.post('/repair', {
          car: carid,
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
          navigate(`/repair/${result.body.id}`)
        }
        // handleCancel();
      } catch (error) {
        console.log(error);
      }
    }
  }

  // const edit = () => {
  //   navigate('/edit');
  // };

  // const follow = async () => {
  //   const response = await api.post('/me/following/' + car.id);
  //   if (response.ok) {
  //     flash(
  //       <>
  //         You are now following <b>{car.carid}</b>.
  //       </>, 'success'
  //     );
  //     setIsFollower(true);
  //   }
  // };

  // const unfollow = async () => {
  //   const response = await api.delete('/me/following/' + car.id);
  //   if (response.ok) {
  //     flash(
  //       <>
  //         You have unfollowed <b>{car.carid}</b>.
  //       </>, 'success'
  //     );
  //     setIsFollower(false);
  //   }
  // };

  return (
    <Body sidebar>

      {car === undefined ?
        <Spinner animation="border" />
      :
        <>
          {car === null ?
              <p>Carro não encontrado.</p>
            :   
              <>
                <h2>Manutenções | {car.brand} - {car.model} {car.year} ({car.mileage/1000} k Km)</h2>
                {car.last_seen && 
                  <p>
                    Última manutenção: <TimeAgo isoDate={car.last_seen * 1000} />
                  </p>}
                {car.next_seen && 
                  <p>
                    Próxima manutenção: <TimeAgo isoDate={car.next_seen * 1000} />
                  </p>}
                  <hr style={{ backgroundColor: 'black', height: '3px', width: '100%' }} />
                <BackButton />

                {/* {isFollower === null &&
                  <Button variant="primary" onClick={edit}>
                    Edit
                  </Button>
                }
                {isFollower === false &&
                  <Button variant="primary" onClick={follow}>
                    Follow
                  </Button>
                }
                {isFollower === true &&
                  <Button variant="primary" onClick={unfollow}>
                    Unfollow
                  </Button>
                } */}

                <Container className="PageCar">
                  <Container>
                    <h3 style={{textAlign: "center" }}>{action[0]}</h3>
                    <Form onSubmit={onSubmit}>
                      <InputField
                        name="id" label="ID" type="hidden"
                        error={formErrors.repairid} fieldRef={repairidField}
                      />
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
                      <Button style={{ display: 'flex', margin: '20px auto' }} variant={action[1]} type="submit">{action[2]}</Button>
                      {action[3] && <Button type="button" variant="outline-danger" onClick={handleCancel}>Cancelar</Button>}
                    </Form>
                  </Container>
                  <Container>
                    <h3 style={{textAlign: "center" }}>Próximas</h3>
                    <Repairs content={car.id} mileage={car.mileage} editRepair={editRepair} copyRepair={copyRepair} />
                  </Container>
                </Container>
              </>
          }
        </>
      }
    </Body>
  );
}