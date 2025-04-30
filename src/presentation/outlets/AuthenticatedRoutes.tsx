import { STORAGE_KEYS } from '@/infrastructure/storage/storageKeys';
import { localStorageAdapter } from '@/infrastructure/storage/localStorageAdapter';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';

const AuthenticatedRoutes = () => {

  /**
   * NAVIGATION
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // CHECK IF USER IS AUTHENTICATED
  const isAuthenticated = localStorageAdapter.hasKey(STORAGE_KEYS.AUTH_TOKEN);

  // IF USER IS NOT AUTHENTICATED, REDIRECT TO LOGIN PAGE
  if (!isAuthenticated) {
    const redirectPath = pathname !== '/' ? pathname : '';
    searchParams.set('redirect', redirectPath);
    setSearchParams(searchParams);
    return <Navigate to={`/auth/login?${searchParams.toString()}`} />;
  }

  // IF USER IS AUTHENTICATED, SHOW THE OUTLET
  return <Outlet />;
};

export default AuthenticatedRoutes;
