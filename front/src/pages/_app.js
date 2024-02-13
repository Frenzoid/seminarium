import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const goHome = () => {
    router.push(`/`);
  };

  const goToCreateSeminar = () => {
    router.push('/seminars/create');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand c-pointer" onClick={goHome}>Seminarium</a>

          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {router.pathname !== '/seminars/create' && (
                <li className="nav-item c-pointer">
                  <a className="nav-link" onClick={goToCreateSeminar}>Create Seminar</a>
                </li>
              )}
              <li className="nav-item c-pointer">
                <a className="nav-link" href="https://adminer.frenzoid.dev">Access Database</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container main">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
