import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate(-1)} variant="primary" type="submit">Voltar</Button>
        </>
    );
}
