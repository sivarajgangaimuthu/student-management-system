import { ArrowLeft, Building2, Mail, MapPin, Pencil, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { getApiErrorMessage, getStudentById } from '../services/studentService.js';

function ViewStudentPage() {
  const { id } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(
    location.state?.message ? { type: 'success', message: location.state.message } : null,
  );

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        setAlert({ type: 'danger', message: getApiErrorMessage(error) });
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  return (
    <div className="container py-4">
      <div className="narrow-page">
        <Link to="/students" className="btn btn-link px-0 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Students
        </Link>

        <AlertMessage
          type={alert?.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />

        {loading ? (
          <LoadingSpinner />
        ) : student ? (
          <section className="details-panel">
            <div className="details-header">
              <span className="avatar avatar-large">{getInitials(student)}</span>
              <div>
                <span className="section-kicker">Student Details</span>
                <h1 className="h2 mt-2 mb-1">{student.firstName} {student.lastName}</h1>
                <p className="text-secondary mb-0">Student ID: {student.id}</p>
              </div>
            </div>

            <div className="details-grid">
              <DetailItem icon={Mail} label="Email" value={student.email} />
              <DetailItem icon={Building2} label="Department" value={student.department} />
              <DetailItem icon={MapPin} label="City" value={student.city} />
              <DetailItem icon={UserRound} label="Full Name" value={`${student.firstName} ${student.lastName}`} />
            </div>

            <div className="d-flex justify-content-end">
              <Link to={`/students/${student.id}/edit`} className="btn btn-primary d-inline-flex align-items-center gap-2">
                <Pencil size={18} aria-hidden="true" />
                Edit Student
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="detail-item">
      <Icon size={20} className="text-primary" aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function getInitials(student) {
  return `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase();
}

export default ViewStudentPage;
