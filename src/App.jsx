import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
      <Route 
        path="/dashboard/*" 
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} 
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      <Route path="/pagenotfound" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;