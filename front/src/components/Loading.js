// components/Loading.js

function Loading() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h3 className="text-white mb-2">Loading</h3>
      <div className="spinner-border text-white" role="status">
      </div>
    </div>
  );
}

export default Loading;