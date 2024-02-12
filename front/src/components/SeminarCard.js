import React from 'react';

const SeminarCard = ({ seminar, goToSeminarDetails }) => {
  const startTime = seminar.schedules.length > 0 ? seminar.schedules[0].time : "TBD";

  return (
    <div className="col-md-4 d-flex align-items-stretch zoom c-pointer" key={seminar.id} onClick={() => goToSeminarDetails(seminar.id)}>
      <div className="card m-2" style={{ color: seminar.txtcolor, backgroundColor: seminar.bgrcolor, width: '100%' }}>
        {seminar.image && (
          <img src={`${seminar.image}`} className="card-img-top" alt={"Picture of Seminar: " + seminar.title} />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">{seminar.title}</h5>
          <hr />
          <p className="card-text">{seminar.description}</p>
          <ul className="list-unstyled mt-auto">
            <li><strong>Speakers:</strong> {seminar.speakers}</li>
            <li><strong>Date and Time:</strong> {seminar.date} {startTime}</li>
            <li><strong>Place:</strong> {seminar.place}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
