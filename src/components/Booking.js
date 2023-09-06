import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import { memo } from 'react';

export default memo(function Booking({ booking }) {
  return (
    <Stack direction="horizontal" gap={3} className="Booking">
      <div>
        <p>
          <Link to={'/booking/' + booking.id}>
            {booking.name}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={booking.timestamp} />:
        </p>
        <p>{booking.desc}</p>
      </div>
    </Stack>
  );
});