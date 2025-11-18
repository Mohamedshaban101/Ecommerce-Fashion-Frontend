import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Navigate } from 'react-router-dom';
import Loader from '../common/Loader';

const AdminRequiredAuth = ({children}) => {
    const {user , loadingUser} = useContext(AdminAuthContext);
    if(loadingUser){
        return <Loader />
    }
    if(user === null){
        return <Navigate to={'/login'} replace/>
    }
    if(user.role !== 'ADM'){
        return <Navigate to="/" replace />;
    }
    return children;
}

export default AdminRequiredAuth