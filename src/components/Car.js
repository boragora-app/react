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
            <Image src={car.brand + '&s=48'} roundedCircle />
            <>
              {car.brand} {car.model} {car.year} | R$ {car.cost}
              &nbsp;&mdash;&nbsp;
              {car.mileage}
            </>
            <p>{car.next_service}</p>
          </Link>
          <div className="ms-auto">
            <ButtonGroup size="sm">
              <Button className="ms-auto"variant="outline-danger" onClick={() => editCar(car)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </Button>
              <Button className="mx-1" variant="outline-secondary" onClick={() => editCar(car, true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </Stack>
    </>
  );
});