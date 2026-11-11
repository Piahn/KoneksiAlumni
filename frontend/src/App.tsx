import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AlumniDirectoryPage } from './pages/AlumniDirectoryPage';
import { DashboardStudentPage } from './pages/DashboardStudentPage';
import { DashboardAlumniPage } from './pages/DashboardAlumniPage';
import { BookingDetailPage } from './pages/BookingDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Automatic role-based dashboard router
const DashboardRouter: React.FC = () => {
  const { role } = useAuth();
  if (role === 'alumni') {
    return <DashboardAlumniPage />;
  }
  return <DashboardStudentPage />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/direktori" element={<AlumniDirectoryPage />} />

            {/* Protected Dashboard Pages */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="/booking/:id" element={<BookingDetailPage />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
