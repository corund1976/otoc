import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import RouteNames from 'router/routes';

import SharedLayout from 'components/sharedLayout';
import LoaderSpinner from 'components/loaderSpinner';

const Hrc = lazy(() => import('pages/hrc'));
const Rank = lazy(() => import('pages/rank'));
const Main = lazy(() => import('pages/main'));
const Lottery = lazy(() => import('pages/lottery'));
const Friends = lazy(() => import('pages/friends'));
const Profile = lazy(() => import('pages/profile'));

function Router() {
  const { pathname } = useLocation();

  const routes = (
    <Route element={<SharedLayout />}>
      <Route index element={<Main />} />
      <Route path={RouteNames.LOTTERY} element={<Lottery />} />
      <Route path={RouteNames.HRC} element={<Hrc />} />
      <Route path={RouteNames.RANK} element={<Rank />} />
      <Route path={RouteNames.FRIENDS} element={<Friends />} />
      <Route path={RouteNames.PROFILE} element={<Profile />} />
      <Route path={RouteNames.ANY} element={<Navigate to="/" replace />} />
    </Route>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Routes>{routes}</Routes>
    </Suspense>
  );
}

export default Router;
