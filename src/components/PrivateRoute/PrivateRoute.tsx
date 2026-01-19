import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
