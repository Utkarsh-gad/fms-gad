import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import DashboardPage from './pages/DashBoardPage';
import Sidebar from './component/SideBar';
import TopNavbar from './component/TopNavBar';
import FavouritesPage from './pages/FavouritesPage';
import MasterFmsPage from './pages/MasterFmsPage';
import MasterTablePage from './pages/MasterTablePage';
import UsersPage from './pages/UsersPage';
import EmailPage from './pages/EmailPage';
import ChecklistPage from './pages/CheckListPage';
import FeaturesPage from './pages/FeaturesPage';
import UploadPage from './pages/UploadPage';

function App() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderPage = () => {
    switch(activeRoute) {
      case 'dashboard': return <DashboardPage />;
      case 'favourites': return <FavouritesPage />;
      case 'master-fms': return <MasterFmsPage />;
      case 'master-table': return <MasterTablePage />;
      case 'users': return <UsersPage />;
      case 'email': return <EmailPage />;
      case 'checklist': return <ChecklistPage />;
      case 'features': return <FeaturesPage />;
      case 'upload': return <UploadPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setActiveRoute={setActiveRoute} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setActiveRoute={setActiveRoute} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? (
          <div className="app-layout">
            <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
            <div className="main-wrapper">
              <TopNavbar setIsAuthenticated={setIsAuthenticated} setActiveRoute={setActiveRoute} />
              <div className="content-wrapper">
                {renderPage()}
              </div>
            </div>
          </div>
        ) : <Navigate to="/login" />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
