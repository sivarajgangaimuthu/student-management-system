import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import StudentForm, { getEmptyStudentForm } from '../components/StudentForm.jsx';
import { getApiErrorMessage, getStudentById, updateStudent } from '../services/studentService.js';

function UpdateStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getEmptyStudentForm());
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        const student = await getStudentById(id);
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          department: student.department,
          city: student.city,
        });
      } catch (error) {
        setAlert({ type: 'danger', message: getApiErrorMessage(error) });
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setAlert(null);
      await updateStudent(id, formData);
      navigate(`/students/${id}`, {
        state: { message: 'Student updated successfully.' },
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
        <span className="section-kicker">Update</span>
        <h1 className="h2 mt-2 mb-1">Edit Student</h1>
        <p className="text-secondary mb-4">Update student profile information.</p>

        <AlertMessage
          type={alert?.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <StudentForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Update Student"
          />
        )}
      </div>
    </div>
  );
}

export default UpdateStudentPage;
