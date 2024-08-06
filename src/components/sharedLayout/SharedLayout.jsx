import { Outlet, useLocation } from 'react-router-dom';

import Footer from 'components/footer';

function SharedLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <main>
        <Outlet />
      </main>
      {!pathname.includes('lottery/') && <Footer />}
    </>
  );
}

export default SharedLayout;
