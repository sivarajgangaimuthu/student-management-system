import { ArrowRight, Building2, MapPin, Server, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { getApiErrorMessage, getStudents } from '../services/studentService.js';

function HomePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        setAlert({ type: 'danger', message: getApiErrorMessage(error) });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const departments = new Set(students.map((student) => student.department).filter(Boolean));
    const cities = new Set(students.map((student) => student.city).filter(Boolean));

    return {
      totalStudents: students.length,
      departments: departments.size,
      cities: cities.size,
      backendStatus: alert ? 'Offline' : 'Online',
    };
  }, [alert, students]);

  const recentStudents = students.slice(0, 4);

  return (
    <section className="home-page">
      <div className="container">
        <AlertMessage
          type={alert?.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />

        <div className="row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <span className="section-kicker">Student Dashboard</span>
            <h1 className="display-5 fw-bold mt-3 mb-3">Student Management System</h1>
            <p className="lead text-secondary mb-4">
              Track student records, departments, cities, and recent additions from one clean dashboard.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/students" className="btn btn-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2">
                View Students
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/students/add" className="btn btn-outline-primary btn-lg">
                Add Student
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="dashboard-preview" aria-label="Application feature preview">
              <div className="preview-header">
                <div>
                  <span className="preview-label">Today</span>
                  <h2 className="h5 mb-0">Student Overview</h2>
                </div>
                <span className={`status-pill ${alert ? 'status-offline' : ''}`}>{stats.backendStatus}</span>
              </div>

              {loading ? (
                <LoadingSpinner label="Loading dashboard..." />
              ) : (
                <>
                  <div className="preview-grid">
                    <DashboardMetric icon={Users} value={stats.totalStudents} label="Total Students" />
                    <DashboardMetric icon={Building2} value={stats.departments} label="Departments" />
                    <DashboardMetric icon={MapPin} value={stats.cities} label="Cities" />
                    <DashboardMetric icon={Server} value={stats.backendStatus} label="Backend API" />
                  </div>

                  <div className="recent-panel">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="h6 mb-0">Recent Students</h3>
                      <Link to="/students" className="small fw-bold text-decoration-none">
                        View all
                      </Link>
                    </div>

                    {recentStudents.length === 0 ? (
                      <p className="text-secondary mb-0">No students added yet.</p>
                    ) : (
                      <div className="recent-list">
                        {recentStudents.map((student) => (
                          <div className="recent-student" key={student.id}>
                            <span className="avatar">{getInitials(student)}</span>
                            <div className="min-w-0">
                              <strong>{student.firstName} {student.lastName}</strong>
                              <span>{student.department} - {student.city}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMetric({ icon: Icon, value, label }) {
  return (
    <div className="metric-tile">
      <Icon size={24} className="text-primary mb-3" aria-hidden="true" />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function getInitials(student) {
  return `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase();
}

export default HomePage;
