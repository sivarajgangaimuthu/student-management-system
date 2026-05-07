function LoadingSpinner({ label = 'Loading data...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 py-5 text-secondary">
      <div className="spinner-border text-primary" role="status" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
