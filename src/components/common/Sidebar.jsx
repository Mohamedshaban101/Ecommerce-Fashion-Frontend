import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link } from 'react-router-dom';
import { useLogout } from '../admin/Logout';

const Sidebar = () => {
    const logout = useLogout();
    return (
        <>
            <div className='border-bottom py-2'>
                <Link to={'/admin/dashboard'}>Dashboard</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/categories'}>Categories</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/brands'}>Brands</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/products'}>Products</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/orders'}>Orders</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/users'}>Users</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/admin/shipping'}>Shipping</Link>
            </div>
            <div className='border-bottom py-2'>
                <a href="#">Change Password</a>
            </div>
            <div className='border-bottom py-2'>
                <button onClick={logout} className={'border-0 bg-transparent fw-bold'}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar