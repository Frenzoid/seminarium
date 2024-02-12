import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router'; // Import useRouter

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const goHome = () => {
    router.push(`/`);
  };

  const goToCreateSeminar = () => {
    router.push('/seminars/create'); // Function to navigate to the create seminar page
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex justify-content-between"> {/* Ensuring the elements are spaced between */}
          <a className="navbar-brand c-pointer" onClick={goHome}>Seminarium</a>
          {router.pathname === '/seminars/create' ? null : (
            <button className="btn btn-primary" onClick={goToCreateSeminar}>Create Seminar</button>
          )}
          <a className="navbar-brand c-pointer" href="https://adminer.frenzoid.dev">db access</a>
        </div>
      </nav>
      <div className="container main">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
