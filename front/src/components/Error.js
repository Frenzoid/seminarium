import React from 'react';

const Error = ({ error }) => {
  const { title, message } = error;

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card my-3 bg-danger w-100">
        <div className="card-body">
          <h4 className="card-title text-white">{title}</h4>
          <pre className="card-text text-white">{message}</pre>
        </div>
      </div>
    </div>
  );
};

export default Error;
