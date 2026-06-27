import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;