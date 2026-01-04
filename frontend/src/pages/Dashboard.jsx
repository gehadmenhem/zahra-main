import { useSelector } from 'react-redux';
import '../App.css';
import DashboardMenu from '../components/menu/DashboardMenu';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const parentId = user?.parent_id;

  return (
    <>
      <DashboardMenu parentId={parentId} />
      {/* <Footer /> */}
    </>
  );
}
