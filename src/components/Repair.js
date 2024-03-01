import Stack from 'react-bootstrap/Stack';
// import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import { memo } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default memo(function Repair({ repair, mileage, editRepair, copyRepair }) {
  return (
    <Stack direction="horizontal" gap={3} className="Car">
      <div>
        <p>
          <Link to={'/repair/' + repair.id}>
            {repair.name}
          </Link>
          &nbsp;<b>{repair.mileage+repair.interval-mileage}</b>
          &nbsp;
          ({(repair.mileage+repair.interval)/1000} k Km)
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={repair.timestamp} />:
        </p>
        <p>{repair.desc}</p>
        <p>R${repair.value} | {repair.user}</p>
      </div>
      <div className="ms-auto">
        <ButtonGroup size="sm">
          <Button className="ms-auto" variant="outline-warning" onClick={() => editRepair(repair)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </Button>
          <Button className="ms-auto" variant="outline-primary" onClick={() => copyRepair(repair)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </Button>
        </ButtonGroup>
      </div>
    </Stack>
  );
});