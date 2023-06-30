import { useState, useEffect, useRef } from 'react';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';
import Car from './Car';
import More from './More';
import InputField from '../components/InputField';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Cars({ content, write }) {
  const [cars, setCars] = useState();
  const [car, setCar] = useState();
  const [pagination, setPagination] = useState();
  const [formErrors, setFormErrors] = useState({});
  const api = useApi();
  const caridField = useRef();
  const licenseField = useRef();
  const brandField = useRef();
  const modelField = useRef();
  const yearField = useRef();
  const colorField = useRef();
  const mileageField = useRef();
  const valueField = useRef();

  let url;
  switch (content) {
    case 'list':
      url = '/cars';
      break
    default:
      url = `/cars`;
      break;
  }

  useEffect(() => {
    brandField.current.focus();
  }, []);

  const flash = useFlash();

  const showCar = (newCar) => {
    setCars([newCar, ...cars]);
  };

  const editCar = (c, n=false) => {
    if (n) {
      caridField.current.value = ""
    } else {
      caridField.current.value = c.id
    }
    licenseField.current.value = c.license || ""
    brandField.current.value = c.brand || ""
    modelField.current.value = c.model || ""
    yearField.current.value = c.year || ""
    colorField.current.value = c.color || ""
    mileageField.current.value = c.mileage || ""
    valueField.current.value = c.value || ""

    console.log('alterar variant do botão do form newcar para amarelo e texto Editar Veículo')

  };

  const checkCarForm = () => {
    const errors = {};
  
    if (!brandField.current.value) {
      errors.brand = "Informe a Marca do veículo";
    }
    if (!modelField.current.value) {
      errors.model = "Informe o Modelo do veículo";
    }
    if (!yearField.current.value) {
      errors.year = "Informe o Ano";
    }
    if (!colorField.current.value) {
      errors.color = "Informe a Cor";
    }
    if (!licenseField.current.value) {
      errors.license = "Informe a Placa";
    }
    if (!mileageField.current.value) {
      errors.mileage = "Informe os Kms";
    }
    if (!valueField.current.value) {
      errors.value = "Informe o Valor";
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false
    }
    return true
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (checkCarForm) {
      try {
        let carset = {
          'id': caridField.current.value,
          'license': licenseField.current.value,
          'brand': brandField.current.value,
          'model': modelField.current.value,
          'year': yearField.current.value,
          'color': colorField.current.value,
          'mileage': mileageField.current.value,
          'value': valueField.current.value,
        }
        setCar(carset)
        const data = await api.post('/car', carset);
  
        if (!data.ok) {
          flash(data.body.error, 'danger');
        } else {
          setFormErrors({});
          flash('Veículo salvo com sucesso!', 'success');
          if (! caridField.current.value) {
            showCar(data.body);
          }
  
          caridField.current.value = '';
          licenseField.current.value = '';
          brandField.current.value = '';
          modelField.current.value = '';
          yearField.current.value = '';
          colorField.current.value = '';
          mileageField.current.value = '';
          valueField.current.value = '';
          brandField.current.focus();

          console.log('alterar variant do botão do form newcar para primary e texto Criar Veículo')

        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  useEffect(() => {
    (async () => {
      const response = await api.get(url);
      if (response.ok) {
        setCars(response.body.data);
        setPagination(response.body.pagination);
      }
      else {
        setCars(null);
      }
    })();
  }, [api, url]);

  const loadNextPage = async () => {
    const response = await api.get(url, {
      after: cars[cars.length - 1].cost
    });
    if (response.ok) {
      setCars([...cars, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  };

  return (
    <>
      <Container className="ListCar">
        <Form className="FormNew" onSubmit={onSubmit}> 
          <h3>Novo</h3>
          <Row className="mb-3">
            <InputField
              name="id" label="ID" type="hidden"
              error={formErrors.carid} fieldRef={caridField} />
            <Form.Group sm={3} as={Col}>
              <InputField
                name="license" label="Placa" type="text"
                error={formErrors.license} fieldRef={licenseField} />
            </Form.Group>
            <Form.Group sm={4} as={Col}>
              <InputField
                name="brand"  label="Marca" type="text"
                error={formErrors.brand} fieldRef={brandField} />
            </Form.Group>
            <Form.Group sm={5} as={Col}>
            <InputField
                name="model" label="Modelo" type="text"
                error={formErrors.model} fieldRef={modelField} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group sm={3} as={Col}>
              <InputField
              name="year" label="Ano" type="text"
              error={formErrors.year} fieldRef={yearField} />
            </Form.Group>
            <Form.Group sm={3} as={Col}>
              <InputField
              name="color" label="Cor" type="text"
              error={formErrors.color} fieldRef={colorField} />
            </Form.Group>
            <Form.Group sm={3} as={Col}>
              <InputField
              name="mileage" label="Km" type="text"
              error={formErrors.mileage} fieldRef={mileageField} />
            </Form.Group>
            <Form.Group sm={3} as={Col}>
              <InputField
              name="value" label="Valor" type="text"
              error={formErrors.value} fieldRef={valueField} />
            </Form.Group>
            <Form.Group style={{ textAlign: "center", margin: "20px" }}  sm={12} as={Col}>
              <Button variant="primary" type="submit">Cadastrar Veículo</Button>
            </Form.Group>
          </Row>
        </Form>
        <Container>
          {cars === undefined ?
              <Spinner animation="border" />
            :
              <>
                {cars === null ?
                  <p>Não foi possível carregar os veículos</p>
                :
                  <>
                    <h3 style={{ textAlign: "center" }} >Lista</h3>
                    {cars.length === 0 ?
                      <p>Nenhum veículo cadastrado.</p>
                    : 
                      cars.map(car => <Car key={car.id} car={car} editCar={editCar} />)
                    }
                    <More pagination={pagination} loadNextPage={loadNextPage} />
                  </>
                }
              </>
            }
        </Container>
      </Container>
    </>
  );
}
