import { Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  city: '',
};

function StudentForm({ formData, setFormData, onSubmit, isSubmitting, submitLabel }) {
  const errors = validateStudent(formData);
  const hasErrors = Object.values(errors).some(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hasErrors) {
      onSubmit();
    }
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />
        <FormField
          label="Department"
          name="department"
          value={formData.department}
          error={errors.department}
          onChange={handleChange}
        />
        <FormField
          label="City"
          name="city"
          value={formData.city}
          error={errors.city}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end mt-4">
        <Link to="/students" className="btn btn-outline-secondary d-inline-flex align-items-center justify-content-center gap-2">
          <X size={18} aria-hidden="true" />
          Cancel
        </Link>
        <button
          type="submit"
          className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2"
          disabled={isSubmitting || hasErrors}
        >
          <Save size={18} aria-hidden="true" />
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

function FormField({ label, name, type = 'text', value, error, onChange }) {
  const inputId = `student-${name}`;

  return (
    <div className="col-md-6">
      <label className="form-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        className={`form-control ${error ? 'is-invalid' : value ? 'is-valid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export function getEmptyStudentForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    city: '',
  };
}

function validateStudent(student) {
  const errors = { ...initialErrors };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!student.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!student.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!student.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(student.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!student.department.trim()) {
    errors.department = 'Department is required.';
  }

  if (!student.city.trim()) {
    errors.city = 'City is required.';
  }

  return errors;
}

export default StudentForm;
