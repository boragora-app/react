import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Body from '../components/Body';
import TimeAgo from '../components/TimeAgo';
import BackButton from '../components/BackButton';

import { useApi } from '../contexts/ApiProvider';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../contexts/UserProvider';
// import { useFlash } from '../contexts/FlashProvider';


export default function RepairPage() {
  const { repairid } = useParams();
  const [repair, setRepair] = useState();
  const api = useApi();
  // const [isFollower, setIsFollower] = useState();
  // const flash = useFlash();
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await api.get('/repair/' + repairid);
      if (response.ok) {
        setRepair(response.body);

        // if (response.body.repairid !== loggedInRepair.repairid) {
        //   const follower = await api.get(
        //     '/me/following/' + response.body.id);
        //   if (follower.status === 204) {
        //     setIsFollower(true);
        //   }
        //   else if (follower.status === 404) {
        //     setIsFollower(false);
        //   }
        // }
        // else {
        //   setIsFollower(null);
        // }
      }
      else {
        setRepair(null);
      }
    })();
  }, [repairid, api]); //, loggedInRepair]);

  // const edit = () => {
  //   navigate('/edit');
  // };

  // const follow = async () => {
  //   const response = await api.post('/me/following/' + repair.id);
  //   if (response.ok) {
  //     flash(
  //       <>
  //         You are now following <b>{repair.repairid}</b>.
  //       </>, 'success'
  //     );
  //     setIsFollower(true);
  //   }
  // };

  // const unfollow = async () => {
  //   const response = await api.delete('/me/following/' + repair.id);
  //   if (response.ok) {
  //     flash(
  //       <>
  //         You have unfollowed <b>{repair.repairid}</b>.
  //       </>, 'success'
  //     );
  //     setIsFollower(false);
  //   }
  // };

  return (
    <Body sidebar>
      {repair === undefined ?
        <Spinner animation="border" />
      :
        <>
          {repair === null ?
            <p>Manutenção não encontrada.</p>
          :
            <Container className="RepairCar">
                <h2>{repair.carname} | {repair.mileage} Km</h2>

                <hr style={{ backgroundColor: 'black', height: '3px', width: '100%' }} />

                <BackButton />
                <h3 style={{ margin: '40px 0px 20px' }}>{repair.name} - <TimeAgo isoDate={repair.timestamp} /></h3>
                <h5>
                  {repair.desc}
                </h5>
              {/* <Container>
                <Repairs content={repair.id} />
              </Container> */}
            </Container>
          }
        </>
      }
    </Body>
  );
}