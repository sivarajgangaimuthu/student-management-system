import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { deleteStudent, getApiErrorMessage, getStudents } from '../services/studentService.js';

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) =>
      [student.firstName, student.lastName, student.email, student.department, student.city]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [students, searchTerm]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setAlert(null);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      setAlert({ type: 'danger', message: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (student) => {
    const confirmed = window.confirm(`Delete ${student.firstName} ${student.lastName}?`);

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(student.id);
      await deleteStudent(student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
      setAlert({ type: 'success', message: 'Student deleted successfully.' });
    } catch (error) {
      setAlert({ type: 'danger', message: getApiErrorMessage(error) });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="page-header">
        <div>
          <span className="section-kicker">Records</span>
          <h1 className="h2 mt-2 mb-1">Students</h1>
          <p className="text-secondary mb-0">Search, view, update, and remove student profiles.</p>
        </div>
        <Link to="/students/add" className="btn btn-primary d-inline-flex align-items-center gap-2">
          <Plus size={18} aria-hidden="true" />
          Add Student
        </Link>
      </div>

      <AlertMessage
        type={alert?.type}
        message={alert?.message}
        onClose={() => setAlert(null)}
      />

      <div className="toolbar">
        <div className="input-group search-box">
          <span className="input-group-text bg-white">
            <Search size={18} aria-hidden="true" />
          </span>
          <input
            type="search"
            className="form-control"
            placeholder="Search by name, email, department, or city"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <span className="text-secondary small">{filteredStudents.length} result(s)</span>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title={students.length === 0 ? 'No students found' : 'No matching students'}
          message={
            students.length === 0
              ? 'Start by adding the first student record.'
              : 'Try a different search term.'
          }
          showAction={students.length === 0}
        />
      ) : (
        <div className="table-responsive table-panel">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">City</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-cell">
                      <span className="avatar">{getInitials(student)}</span>
                      <div>
                        <strong>{student.firstName} {student.lastName}</strong>
                        <span className="text-secondary small d-block">ID: {student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.city}</td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <Link className="btn btn-sm btn-outline-secondary icon-button" to={`/students/${student.id}`} title="View student">
                        <Eye size={16} aria-hidden="true" />
                      </Link>
                      <Link className="btn btn-sm btn-outline-primary icon-button" to={`/students/${student.id}/edit`} title="Edit student">
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger icon-button"
                        title="Delete student"
                        onClick={() => handleDelete(student)}
                        disabled={deletingId === student.id}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getInitials(student) {
  return `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`.toUpperCase();
}

export default StudentListPage;
