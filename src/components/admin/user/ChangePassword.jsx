import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/Http';
import Layout from '../../common/Layout';
import UserSidebar from '../../common/UserSidebar';

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const saveNewPassword = async (data) => {
        const res = await fetch(`${apiUrl}/change-password`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await res.json();
        if (result.status === 200) {
            toast.success(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        } else {
            // result.error.map(error => {
                toast.error(result.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            // })
        }
    }
    return (
        <Layout>
            <div className='container brand py-5'>
                <h3>Change Password</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <UserSidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='create-category'>
                                    <form action="" className='form' onSubmit={handleSubmit(saveNewPassword)}>
                                        <div className='shadow p-4 rounded mb-4'>
                                            <div className='form-group mb-3'>
                                                <div className='row mb-4'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="old_password" className='form-label'>Old Password</label>
                                                        <input
                                                            {
                                                            ...register('old_password', {
                                                                required: 'The Field Old Password Is Required'
                                                            })
                                                            }
                                                            type="text" name='old_password' className={`form-control ${errors.old_password && 'is-invalid'}`} placeholder='old password' />
                                                        {
                                                            errors.old_password && <p className='invalid-feedback'>{errors.old_password?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row mb-4'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="password" className='form-label'>New Password</label>
                                                        <input
                                                            {
                                                            ...register('password', {
                                                                required: 'The Field Password Is Required'
                                                            })
                                                            }
                                                            type="text" name='password' className={`form-control ${errors.password && 'is-invalid'}`} placeholder='password' />
                                                        {
                                                            errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="cpassword" className='form-label'>Confirm Password</label>
                                                        <input
                                                            {
                                                            ...register('password_confirmation', {
                                                                required: 'The Field Confirm Password Is Required'
                                                            })
                                                            }
                                                            type="text" name='password_confirmation' className={`form-control ${errors.password_confirmation && 'is-invalid'}`} placeholder='confirm password' />
                                                        {
                                                            errors.password_coonfirmation && <p className='invalid-feedback'>{errors.password_confirmation?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='btn btn-info text-white'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ChangePassword