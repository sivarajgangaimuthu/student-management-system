import { AlertCircle, CheckCircle2 } from 'lucide-react';

function AlertMessage({ type = 'info', message, onClose }) {
  if (!message) {
    return null;
  }

  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className={`alert alert-${type} d-flex align-items-start gap-2`} role="alert">
      <Icon size={20} className="mt-1 flex-shrink-0" aria-hidden="true" />
      <div className="flex-grow-1">{message}</div>
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close alert" onClick={onClose} />
      )}
    </div>
  );
}

export default AlertMessage;
