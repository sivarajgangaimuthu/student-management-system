import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AddStudentPage from './pages/AddStudentPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import StudentListPage from './pages/StudentListPage.jsx';
import UpdateStudentPage from './pages/UpdateStudentPage.jsx';
import ViewStudentPage from './pages/ViewStudentPage.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/students/add" element={<AddStudentPage />} />
          <Route path="/students/:id" element={<ViewStudentPage />} />
          <Route path="/students/:id/edit" element={<UpdateStudentPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
