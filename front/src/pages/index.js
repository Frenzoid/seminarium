import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading'; // Import the Loading component

export default function Home() {
  const [seminars, setSeminars] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function fetchSeminars() {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/seminars`);
      setSeminars(response.data);
    } catch (error) {
      setError(`Error fetching seminars: ${error}`);
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

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {seminars.map((seminar) => (
          <div className="col-md-4 d-flex align-items-stretch" key={seminar.id} onClick={() => goToSeminarDetails(seminar.id)}>
            <div className="card m-2" style={{ cursor: 'pointer', width: '100%' }}>
              <img src={seminar.imagePath} className="card-img-top" alt={seminar.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{seminar.title}</h5>
                <hr />
                <p className="card-text">{seminar.description}</p>
                <ul className="list-unstyled mt-auto">
                  <li><strong>Speakers:</strong> {seminar.speakers}</li>
                  <li><strong>Date and Time:</strong> {seminar.date} | {seminar.schedules[0].time}</li>
                  <li><strong>Place:</strong> {seminar.place}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
