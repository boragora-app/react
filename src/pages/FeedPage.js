import Body from '../components/Body';
import Posts from '../components/Posts';
import Breadcrumb from '../components/Breadcrumb';

export default function FeedPage() {
  return (
    <Body sidebar>
      <Breadcrumb />
      <Posts write={true} />
    </Body>
  );
}