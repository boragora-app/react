import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useApi } from '../contexts/ApiProvider';
import Repair from './Repair';
import More from './More';
import Write from './Write';

export default function Repairs({ content, mileage, editRepair, copyRepair, write }) {
  const [repairs, setRepairs] = useState();
  const [pagination, setPagination] = useState();
  const api = useApi();

  let url;
  switch (content) {
    case 'feed':
    case undefined:
      url = '/feed';
      break;
    case 'explore':
      url = '/repairs';
      break
    default:
      url = `/car/${content}/repairs`;
      break;
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(url, {});
      if (response.ok) {
        setRepairs(response.body.data.splice(-5));
        setPagination(response.body.pagination);
      }
      else {
        setRepairs(null);
      }
    })();
  }, [api, url]);

  const loadNextPage = async () => {
    const response = await api.get(url, {
      offset: repairs.length
    });
    if (response.ok) {
      setRepairs([...repairs, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  };

  const showRepair = (newRepair) => {
    setRepairs([newRepair, ...repairs]);
  };

  return (
    <>
      {write && <Write showRepair={showRepair} />}
      {repairs === undefined ?
        <Spinner animation="border" />
      :
        <>
          {repairs === null ?
             <p>Não foi possível buscar as manutenções.</p>
          :
            <>
              {repairs.length === 0 ?
                <p>Sem manutenções cadastradas.</p>
              :
                repairs.map(repair => <Repair key={repair.id} repair={repair} mileage={mileage} editRepair={editRepair} copyRepair={copyRepair}/>)
              }
              <More pagination={pagination} loadNextPage={loadNextPage} />
            </>
          }
        </>
      }
    </>
  );
}
