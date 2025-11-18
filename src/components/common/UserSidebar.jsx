import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../admin/Logout';

const Sidebar = () => {
    const logout = useLogout();
    return (
        <>
            <div className='border-bottom py-2'>
                <Link to={'/account'}>Account</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/account/orders'}>Orders</Link>
            </div>
            <div className='border-bottom py-2'>
                <Link to={'/change-password'}>Change Password</Link>
            </div>
            <div className='border-bottom py-2'>
                <button onClick={logout} className={'border-0 bg-transparent fw-bold'}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar