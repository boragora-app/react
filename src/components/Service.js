import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import { memo } from 'react';

export default memo(function Service({ service }) {
  return (
    <Stack direction="horizontal" gap={3} className="Service">
      <Image src={service.author.avatar_url + '&s=48'}
             alt={service.author.username} roundedCircle />
      <div>
        <p>
          <Link to={'/user/' + service.author.username}>
            {service.author.username}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={service.timestamp} />:
        </p>
        <p>{service.text}</p>
      </div>
    </Stack>
  );
});