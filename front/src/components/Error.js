import React from 'react';

const Error = ({ error }) => {
  const { title, message } = error;

  return (
    <div className="col-12 d-flex justify-content-center text-center">
      <div className="alert alert-danger my-3 bg-danger w-100" role="alert">
        <h4 className="alert-heading text-white">{title}</h4>
        <p className="mb-0 text-white">{message}</p>
      </div>
    </div>
  );
};

export default Error;
