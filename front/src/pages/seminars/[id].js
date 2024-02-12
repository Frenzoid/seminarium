import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

import getConfig from 'next/config'

export default function SeminarDetails() {
  const [seminar, setSeminar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { publicRuntimeConfig } = getConfig()
  const { APIURL } = publicRuntimeConfig

  async function fetchSeminarDetails() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${APIURL}/seminars/${id}`);
      setSeminar(data);
    } catch (error) {
      console.error(error);
      setError(`Error fetching seminar details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchSeminarDetails();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!seminar) {
    return <h4 className="container py-5 text-white">Seminar not found :c</h4>;
  }

  return (
    <div className="container py-5 text-white">
      <div className="row">
        {seminar.image && (
          <div className="col-md-7">
            <img
              src={`${seminar.image}`}
              alt={seminar.title}
              className="img-fluid"
            />
          </div>
        )}
        <div className="col-md-5">
          <h2>{seminar.title}</h2>
          <p>{seminar.description}</p>

          <hr />
          <h3>Details:</h3>
          <ul className="list-unstyled">
            <li><strong>Speakers:</strong> {seminar.speakers}</li>
            <li><strong>Date and Time:</strong> {seminar.date}</li>
            <li><strong>Place:</strong> {seminar.place}</li>
          </ul>


          <hr />
          <h3>Schedule:</h3>
          <ul className="list-unstyled">

            {seminar.schedules.map((schedule, index) => (
              <li key={index}><strong>{schedule.time}</strong> {schedule.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
