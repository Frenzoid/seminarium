import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import getConfig from 'next/config'

import axios from 'axios';

import Loading from '../components/Loading';
import Error from '../components/Error';
import SeminarCard from '../components/SeminarCard';




export default function Home() {
  const [seminars, setSeminars] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { publicRuntimeConfig } = getConfig()
  const { APIURL } = publicRuntimeConfig

  async function fetchSeminars() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${APIURL}/seminars`);
      setSeminars(data);
    } catch (error) {
      console.error(error);
      router.push('/oops');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSeminars();
  }, []);

  const goToSeminarDetails = (id) => {
    router.push(`/seminars/${id}`);
  };

  const goToMaitenance = () => {
    router.push(`/oops`);
  }

  if (loading) {
    return <Loading />; // Render the loading component if the data is still being fetched
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="text-white mb-4 pt-4">Upcoming Seminars</h2>

        {seminars && seminars.map((seminar) => (
          <SeminarCard key={seminar.id} seminar={seminar} goToSeminarDetails={goToSeminarDetails} />
        ))}

      </div>
    </div>
  );
}
