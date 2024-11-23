import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { selectToken, selectUser } from '../../store/redux/slices/authSlice';

function AdminProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  console.log("insideAdmin");
  
  if (user !== null && user.role === 'default') {
    return (
      <Navigate
        to='/users'
        replace
      />
    );
  }
  if (user === null || token === null) {
    return (
      <Navigate
        to='/auth'
        replace
      />
    );
  }
  return <>{children}</>;
}

export default AdminProtectedRoute;
