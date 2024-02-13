import React from 'react';

const SeminarCard = ({ seminar, goToSeminarDetails }) => {
  const startTime = seminar.schedules.length > 0 && seminar.schedules[0].time;
  const seminarDate = new Date(seminar.date);
  const formattedDate = seminarDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="col-md-4 d-flex align-items-stretch zoom c-pointer" key={seminar.id} onClick={() => goToSeminarDetails(seminar.id)}>
      <div className="card m-2" style={{ color: seminar.txtcolor, backgroundColor: seminar.bgrcolor, width: '100%' }}>
        {seminar.image && (
          <img src={`${seminar.image}`} className="card-img-top" alt={"Picture of Seminar: " + seminar.title} />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">{seminar.title || "Seminar Title"}</h5>
          <hr />
          <p className="card-text">{seminar.description || "Seminar descriptiooo ooooooo ooooooo oooooo ooooon :)"}</p>
          <ul className="list-unstyled mt-auto">
            <li><strong>Speakers:</strong> {seminar.speakers || "I, me and myself."}</li>
            <li><strong>Date and Time:</strong> {formattedDate || "01/02/0304"} {startTime || "TBD"}</li>
            <li><strong>Place:</strong> {seminar.place}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
