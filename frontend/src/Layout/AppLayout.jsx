import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

function AppLayout({ children }) {
  return (
    <div className=''>
      <Navbar />
      <div className=''>{children ? children : <Outlet />}</div>
    </div>
  );
}

export default AppLayout;
