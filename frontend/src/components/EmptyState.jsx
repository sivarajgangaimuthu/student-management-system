import { Link } from 'react-router-dom';
import { Plus, SearchX } from 'lucide-react';

function EmptyState({ title, message, showAction = true }) {
  return (
    <div className="empty-state text-center">
      <SearchX size={42} className="text-secondary mb-3" aria-hidden="true" />
      <h2 className="h5">{title}</h2>
      <p className="text-secondary mb-4">{message}</p>
      {showAction && (
        <Link to="/students/add" className="btn btn-primary d-inline-flex align-items-center gap-2">
          <Plus size={18} aria-hidden="true" />
          Add Student
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
