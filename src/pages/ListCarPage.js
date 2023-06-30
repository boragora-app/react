import Body from '../components/Body';
import Cars from '../components/Cars';
import Breadcrumb from '../components/Breadcrumb';


export default function ListCarPage() {
  return (
    <Body sidebar>
      <Breadcrumb />
      <h2>Controle de Veículos</h2>
      <hr style={{ backgroundColor: 'black', height: '3px', width: '100%' }} />
      <Cars content="list" />
    </Body>
  );
}