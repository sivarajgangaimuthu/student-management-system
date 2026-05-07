import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import StudentForm, { getEmptyStudentForm } from '../components/StudentForm.jsx';
import { createStudent, getApiErrorMessage } from '../services/studentService.js';

function AddStudentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getEmptyStudentForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setAlert(null);
      const createdStudent = await createStudent(formData);
      navigate(`/students/${createdStudent.id}`, {
        state: { message: 'Student added successfully.' },
      });
    } catch (error) {
      setAlert({ type: 'danger', message: getApiErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="narrow-page">
        <span className="section-kicker">Create</span>
        <h1 className="h2 mt-2 mb-1">Add Student</h1>
        <p className="text-secondary mb-4">Enter student details to create a new record.</p>

        <AlertMessage
          type={alert?.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />

        <StudentForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Create Student"
        />
      </div>
    </div>
  );
}

export default AddStudentPage;
