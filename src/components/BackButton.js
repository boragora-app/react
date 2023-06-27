import { useHistory } from 'react-router-dom';

function BackButton() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button onClick={handleGoBack}>Voltar</button>
  );
}