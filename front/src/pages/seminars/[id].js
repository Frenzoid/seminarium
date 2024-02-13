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

      // Format date
      const seminarDate = new Date(data.date);
      const formattedDate = seminarDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      data.date = formattedDate;

      setSeminar(data);
    } catch (error) {
      console.error(error);
      setError({
        title: 'Error fetching seminar details from the server.',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  }

  async function removeSeminar() {
    setLoading(true);
    try {
      await axios.delete(`${APIURL}/seminars/${id}`);
      router.push('/');
    } catch (error) {
      console.error(error);
      setError({
        title: 'Error removing seminar.',
        message: error.message
      });
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
      <div className={`row ${!seminar.image ? 'justify-content-center' : ''}`}>
        {seminar.image && (
          <div className="col-md-7">
            <img
              src={`${seminar.image}`}
              alt={seminar.title}
              className="img-fluid"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
        <div className={`${seminar.image ? 'col-md-5' : 'col-md-8'}`}>
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
      <div className="d-flex justify-content-end mt-3">
        <button onClick={() => router.push(`/seminars/modify/${id}`)} className="btn btn-primary me-2">Modify</button>
        <button onClick={() => removeSeminar()} className="btn btn-danger">Remove</button>
      </div>
    </div>
  );
}
