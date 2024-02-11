import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router'; // Import useRouter

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const goHome = (id) => {
    router.push(`/`);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand c-pointer " onClick={goHome}>Seminarium</a>
          <a className="navbar-brand c-pointer " href="https://adminer.frenzoid.dev">db access</a>
        </div>
      </nav>
      <div className="container main">
        <Component {...pageProps} />
      </div>
    </div>)
}