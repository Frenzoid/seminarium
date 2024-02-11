import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

export default function SeminarDetails() {
  const [seminar, setSeminar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  async function fetchSeminarDetails() {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/seminars/${id}`);
      setSeminar(response.data);
    } catch (error) {
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
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div className="card text-white bg-danger my-3">
              <div className="card-header">Error</div>
              <div className="card-body">
                <p className="card-text">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!seminar) {
    return <h4 className="container py-5 text-white">Seminar not found :c</h4>;
  }

  return (
    <div className="container py-5 text-white">
      <div className="row">
        <div className="col-md-7 mb-2">
          <img src={seminar.imagePath} alt={seminar.title} style={{ width: '100%', height: 'auto' }} className="border border-1 border-light" />
        </div>
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
