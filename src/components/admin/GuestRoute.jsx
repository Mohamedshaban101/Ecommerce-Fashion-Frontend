import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';
import Loader from '../common/Loader';

const GuestRoute = ({children}) => {
  const { user, loadingUser } = useContext(AdminAuthContext);

  if (loadingUser) return <Loader />;

  if (user) return <Navigate to="/admin/dashboard" replace />;

  return children;
}

export default GuestRoute