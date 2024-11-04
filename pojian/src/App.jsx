import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OpmlImport from './pages/OpmlImport';
import NewsListPage from './pages/NewsList';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/news" replace /> : <Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/news" replace /> : <Login />} 
      />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <NewsListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/opml-import"
        element={
          <PrivateRoute>
            <OpmlImport />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;