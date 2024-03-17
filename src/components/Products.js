import { useState, useEffect, useRef } from 'react';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';
import Product from './Product';
import More from './More';
import InputField from '../components/InputField';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Products({ content, write }) {
  const [products, setProducts] = useState();
  const [pagination, setPagination] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [action, setAction] = useState(['Novo Produto', 'outline-success', 'Cadastrar', 'true']);
  const api = useApi();
  const productidField = useRef();
  const nameField = useRef();
  const qtdField = useRef();
  const valueField = useRef();
  const publicField = useRef();
  const serviceField = useRef();
  const obsField = useRef();

  let url;
  switch (content) {
    case 'list':
      url = '/products';
      break
    default:
      url = `/products`;
      break;
  }

  useEffect(() => {
    nameField.current.focus();
  }, []);

  const flash = useFlash();

  const showProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const copyProduct = (p => {
    setAction(['Novo Produto', 'outline-success', 'Cadastrar', 'true'])
    productidField.current.value = ""

    nameField.current.value = p.name || ""
    qtdField.current.value = p.qtd || ""
    valueField.current.value = p.value || ""
    publicField.current.value = p.public || ""
    serviceField.current.value = p.service || ""
    obsField.current.value = p.obs || ""

    // setDescription(r.desc || "");
  })

  const editProduct = (p) => {
    setAction(['Editar Produto', 'outline-warning', 'Editar', 'true'])
    productidField.current.value = p.id

    nameField.current.value = p.name || ""
    obsField.current.value = p.obs || ""
    publicField.current.value = p.public || ""
    serviceField.current.value = p.service || ""
    qtdField.current.value = p.qtd || ""
    valueField.current.value = p.value || ""
  };

  function handleCancel() {
    setAction(['Novo Produto', 'outline-success', 'Cadastrar', 'true'])
    productidField.current.value = '';
    nameField.current.value = '';
    obsField.current.value = '';
    publicField.current.value = '';
    serviceField.current.value = '';
    qtdField.current.value = '';
    valueField.current.value = '';
    nameField.current.focus();
  }

  const checkProductForm = () => {
    const errors = {};
  
    if (!nameField.current.value) {
      errors.name = "Informe o Nome do Produto";
    }
    if (!qtdField.current.value) {
      errors.qtd = "Informe a Quantidade em Estoque";
    }
    if (!serviceField.current.value && !valueField.current.value) {
      errors.value = "Informe o Valor";
    }
    // if (!obsField.current.value) {
    //   errors.obs = "Informe as Observações";
    // }
    // if (!publicField.current.value) {
    //   errors.public = "Informe se é um Produto Publicado";
    // }
    // if (!serviceField.current.value) {
    //   errors.service = "Informe se é um Serviço";
    // }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false
    }
    return true
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (checkProductForm) {
      try {
        const data = await api.post('/product', {
          'id': productidField.current.value,
          'obs': obsField.current.value,
          'name': nameField.current.value,
          'public': publicField.current.checked,
          'service': serviceField.current.checked,
          'qtd': qtdField.current.value,
          'value': valueField.current.value,
        });
  
        if (!data.ok) {
          flash(data.body.error, 'danger');
        } else {
          setFormErrors({});
          flash('Produto salvo com sucesso!', 'success');
          if (! productidField.current.value) {
            showProduct(data.body);
          }
          handleCancel();
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
        setProducts(response.body.data);
        setPagination(response.body.pagination);
      }
      else {
        setProducts(null);
      }
    })();
  }, [api, url]);

  const loadNextPage = async () => {
    const response = await api.get(url, {
      offset: products.length
    });
    if (response.ok) {
      setProducts([...products, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  };

  return (
    <>
      <Container className="ListProduct">
        <Form className="FormNew" onSubmit={onSubmit}> 
          <h3>{action[0]}</h3>
          <Row className="mb-3">
            <InputField
              name="id" label="ID" type="hidden"
              error={formErrors.productid} fieldRef={productidField} />
            <Form.Group sm={6} as={Col}>
              <InputField
                name="name"  label="Nome" type="text"
                error={formErrors.name} fieldRef={nameField} />
            </Form.Group>
            <Form.Group sm={2} as={Col}>
              <InputField
                name="qtd" label="Qtd" type="number"
                error={formErrors.qtd} fieldRef={qtdField} />
            </Form.Group>
            <Form.Group sm={2} as={Col}>
              <InputField
                name="value" label="Valor" type="number"
                error={formErrors.value} fieldRef={valueField} />
            </Form.Group>
            <Form.Group sm={2} as={Col}>
              <Form.Check
                type="switch"
                id="public"
                label="Publicar"
                error={formErrors.public}
                ref={publicField}
              />
              <Form.Check
                type="switch"
                id="service"
                label="Serviço"
                error={formErrors.service}
                ref={serviceField}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group sm={12} as={Col}>
              <InputField
                name="obs" label="Observações" type="text"
                error={formErrors.obs} fieldRef={obsField} />
            </Form.Group>
            <Form.Group style={{ textAlign: "center", margin: "20px" }}  sm={12} as={Col}>
              <Button variant={action[1]} type="submit">{action[2]}</Button>
              {" "}
              {action[3] && <Button type="button" variant="outline-danger" onClick={handleCancel}>Cancelar</Button>}
            </Form.Group>
          </Row>
        </Form>
        <Container>
          {products === undefined ?
              <Spinner animation="border" />
            :
              <>
                {products === null ?
                  <p>Não foi possível carregar os produtos</p>
                :
                  <>
                    <h3 style={{ textAlign: "center" }} >Lista</h3>
                    {products.length === 0 ?
                      <p>Nenhum produto cadastrado.</p>
                    : 
                      products.map(product => <Product key={product.id} product={product} editProduct={editProduct} copyProduct={copyProduct} />)
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
