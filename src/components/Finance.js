import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import TimeAgo from './TimeAgo';
import { memo } from 'react';

export default memo(function Car({ car, editCar }) {
  return (
    <>
      <Container className="ListCar">
        <Link to={'/car/' + car.id} className="CarLink">
          <Stack direction="horizontal" gap={3} className="Car">
            <Image src={car.brand + '&s=48'} roundedCircle />
            <div>
              <p>
                {car.brand} {car.model} {car.year} | R$ {car.cost}
                &nbsp;&mdash;&nbsp;
                {car.mileage}
              </p>
              <p>{car.next_service}</p>
            </div>

          </Stack>
        </Link>
        <Button variant="primary" onClick={() => editCar(car)}>EditIcon</Button>
        <Button variant="primary" onClick={() => editCar(car, true)}>CloneIcon</Button>
      </Container>
    </>
  );
});