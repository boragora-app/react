import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useApi } from '../contexts/ApiProvider';
import Booking from './Booking';
import More from './More';
import Write from './Write';

export default function Bookings({ content, write }) {
  const [bookings, setBookings] = useState();
  const [pagination, setPagination] = useState();
  const api = useApi();

  let url;
  switch (content) {
    case 'feed':
    case undefined:
      url = '/feed';
      break;
    case 'explore':
      url = '/bookings';
      break
    default:
      url = `/booking/${content}/bookings`;
      break;
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(url, {after: '99999999999'});
      if (response.ok) {
        setBookings(response.body.data.splice(-5));
        setPagination(response.body.pagination);
      }
      else {
        setBookings(null);
      }
    })();
  }, [api, url]);

  const loadNextPage = async () => {
    const response = await api.get(url, {
      after: bookings[bookings.length - 1].timestamp
    });
    if (response.ok) {
      setBookings([...bookings, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  };

  const showBooking = (newBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  return (
    <>
      {write && <Write showBooking={showBooking} />}
      {bookings === undefined ?
        <Spinner animation="border" />
      :
        <>
          {bookings === null ?
             <p>Não foi possível buscar as manutenções.</p>
          :
            <>
              {bookings.length === 0 ?
                <p>Sem manutenções cadastradas.</p>
              :
                bookings.map(booking => <Booking key={booking.id} booking={booking} />)
              }
              <More pagination={pagination} loadNextPage={loadNextPage} />
            </>
          }
        </>
      }
    </>
  );
}
