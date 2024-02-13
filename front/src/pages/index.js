import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Loading from '../components/Loading';
import Error from '../components/Error';
import SeminarCard from '../components/SeminarCard';

import getConfig from 'next/config'


export default function Home() {
  const [seminars, setSeminars] = useState(null);
  const [error, setError] = useState('');
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
      setError({
        title: 'Error fetching seminars from the server.',
        message: error.message
      });
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

  if (loading) {
    return <Loading />; // Render the loading component if the data is still being fetched
  }

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        {seminars.map((seminar) => (
          <SeminarCard key={seminar.id} seminar={seminar} goToSeminarDetails={goToSeminarDetails} />
        ))}

      </div>
    </div>
  );
}
