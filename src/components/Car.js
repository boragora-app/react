import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import TimeAgo from './TimeAgo';
import { memo } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// import { PincelSquare } from "react-icons/bs";

export default memo(function Car({ car, editCar }) {
  return (
    <>
        <Stack direction="horizontal" gap={3} className="Car">

          <Link to={'/car/' + car.id} className="CarLink">
            <Image src={car.brand + '.png'} roundedCircle />
            <>
              {car.brand} {car.model} {car.year} | R$ {car.cost}
              &nbsp;&mdash;&nbsp;
              {car.mileage/1000} Mil km
            </>
            <p>{car.next_service}</p>
          </Link>
          <div className="ms-auto">
            <ButtonGroup size="sm">
              <Button className="ms-auto" variant="outline-warning" onClick={() => editCar(car)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </Stack>
    </>
  );
});