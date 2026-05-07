import { ArrowRight, Database, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="home-page">
      <div className="container">
        <div className="row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <span className="section-kicker">Full Stack CRUD Application</span>
            <h1 className="display-5 fw-bold mt-3 mb-3">Student Management System</h1>
            <p className="lead text-secondary mb-4">
              Manage student records with a clean React interface, Spring Boot REST APIs, validation,
              MySQL persistence, and a professional layered architecture.
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
                <span className="status-pill">Online</span>
              </div>
              <div className="preview-grid">
                <FeatureMetric icon={Users} value="CRUD" label="Student Records" />
                <FeatureMetric icon={Database} value="MySQL" label="Data Storage" />
                <FeatureMetric icon={ShieldCheck} value="DTO" label="Validated APIs" />
                <FeatureMetric icon={LayoutDashboard} value="React" label="Responsive UI" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureMetric({ icon: Icon, value, label }) {
  return (
    <div className="metric-tile">
      <Icon size={24} className="text-primary mb-3" aria-hidden="true" />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default HomePage;
