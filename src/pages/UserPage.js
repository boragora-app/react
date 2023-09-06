import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Body from '../components/Body';
import TimeAgo from '../components/TimeAgo';
import Posts from '../components/Posts';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';


export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const api = useApi();
  const [isFollower, setIsFollower] = useState();
  const { user: loggedInUser } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await api.get('/users/' + username);
      if (response.ok) {
        setUser(response.body);
        if (response.body.name !== loggedInUser.name) {
          const follower = await api.get(
            '/me/following/' + response.body.id);
          if (follower.status === 204) {
            setIsFollower(true);
          }
          else if (follower.status === 404) {
            setIsFollower(false);
          }
        }
        else {
          setIsFollower(null);
        }
      }
      else {
        setUser(null);
      }
    })();
  }, [username, api, loggedInUser]);

  const edit = () => {
    navigate('/edit');
  };

  const follow = async () => {
    const response = await api.post('/me/following/' + user.id);
    if (response.ok) {
      flash(
        <>
          Agora você está seguindo <b>{user.name}</b>.
        </>, 'success'
      );
      setIsFollower(true);
    }
  };

  const unfollow = async () => {
    const response = await api.delete('/me/following/' + user.id);
    if (response.ok) {
      flash(
        <>
          Você deixou de seguir <b>{user.name}</b>.
        </>, 'success'
      );
      setIsFollower(false);
    }
  };

  return (
    <Body sidebar>
      {user === undefined ?
        <Spinner animation="border" />
      :
        <>
          {user === null ?
            <p>Usuário não encontrado.</p>
          :
            <>
              <Stack direction="horizontal" gap={4}>
                <Image src={user.avatar_url + '&s=128'} roundedCircle />
                <div>
                  <h1>{user.name}</h1>
                  {user.about && <h5>{user.about}</h5>}
                  <p>
                    Membro desde: <TimeAgo isoDate={user.first_seen} />
                    <br />
                    Visto por último: <TimeAgo isoDate={user.last_seen} />
                  </p>

                  {isFollower === null &&
                    <Button variant="primary" onClick={edit}>
                      Editar
                    </Button>
                  }
                  {isFollower === false &&
                    <Button variant="primary" onClick={follow}>
                      Seguir
                    </Button>
                  }
                  {isFollower === true &&
                    <Button variant="primary" onClick={unfollow}>
                      Deixar de seguir
                    </Button>
                  }
                </div>
              </Stack>
              <Posts content={user.id} />
            </>
          }
        </>
      }
    </Body>
  );
}