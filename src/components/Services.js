import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useApi } from '../contexts/ApiProvider';
import Service from './Service';
import More from './More';
import Write from './Write';

export default function Services({ content, write }) {
  const [services, setServices] = useState();
  const [pagination, setPagination] = useState();
  const api = useApi();

  let url;
  switch (content) {
    case 'feed':
    case undefined:
      url = '/feed';
      break;
    case 'explore':
      url = '/services';
      break
    default:
      url = `/users/${content}/services`;
      break;
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(url);
      if (response.ok) {
        setServices(response.body.data);
        setPagination(response.body.pagination);
      }
      else {
        setServices(null);
      }
    })();
  }, [api, url]);

  const loadNextPage = async () => {
    const response = await api.get(url, {
      after: services[services.length - 1].timestamp
    });
    if (response.ok) {
      setServices([...services, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  };


  const showService = (newService) => {
    setServices([newService, ...services]);
  };

  return (
    <>
      {write && <Write showService={showService} />}
      {services === undefined ?
        <Spinner animation="border" />
      :
        <>
          {services === null ?
             <p>Could not retrieve blog services.</p>
          :
            <>
              {services.length === 0 ?
                <p>There are no blog services.</p>
              :
                services.map(service => <Service key={service.id} service={service} />)
              }
              <More pagination={pagination} loadNextPage={loadNextPage} />
            </>
          }
        </>
      }
    </>
  );
}
