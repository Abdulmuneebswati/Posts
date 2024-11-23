import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { selectToken, selectUser } from '../../store/redux/slices/authSlice';

function UserProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  if (user !== null && user.role !== 'default') {
    return (
      <Navigate
        to='/auth'
        replace
      />
    );
  }
  if (user !== null && user.role === 'admin') {
    return (
      <Navigate
        to='/admin'
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

export default UserProtectedRoute;
