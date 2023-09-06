import Stack from 'react-bootstrap/Stack';
// import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import { memo } from 'react';

export default memo(function Repair({ repair }) {
  return (
    <Stack direction="horizontal" gap={3} className="Car">
      <div>
        <p>
          <Link to={'/repair/' + repair.id}>
            {repair.name}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={repair.timestamp} />:
        </p>
        <p>{repair.desc}</p>
        <p>R${repair.value} | {repair.user}</p>
      </div>
    </Stack>
  );
});