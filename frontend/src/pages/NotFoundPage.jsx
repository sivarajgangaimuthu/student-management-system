import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-6 fw-bold">Page not found</h1>
      <p className="text-secondary mb-4">The page you are looking for does not exist.</p>
      <Link to="/students" className="btn btn-primary">
        Go to Students
      </Link>
    </div>
  );
}

export default NotFoundPage;
