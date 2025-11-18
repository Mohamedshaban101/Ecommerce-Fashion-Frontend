import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/Http';
import Layout from '../../common/Layout';
import Loader from '../../common/Loader';
import UserSidebar from '../../common/UserSidebar';

const UserInfo = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const saveUserInfo = async (data) => {
        const res = await fetch(`${apiUrl}/account`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        const result = await res.json();

        if (result.status === 200) {
            toast.success(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
            })
        } else {
            toast.error(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
            })
        }
    }
    const fetchUserInfo = async () => {
        const res = await fetch(`${apiUrl}/account`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        const result = await res.json();
        if (result.status === 200) {
            return result.data;
        }
        return [];
    }
    const { data: userInfo = null, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo
    });
    return (
        <Layout>
            <div className='container brand py-5'>
                <h3>User Information</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <UserSidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='create-category'>
                                    {
                                        loadingUserInfo ? <Loader /> :
                                    <form action="" className='form' onSubmit={handleSubmit(saveUserInfo)}>
                                        <div className='shadow p-4 rounded mb-4'>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="name" className='form-label'>Name</label>
                                                        <input
                                                            {
                                                            ...register('name')
                                                            }
                                                            type="text" name='name' value={userInfo ? userInfo.name : ''} className={`form-control ${errors.name && 'is-invalid'}`} placeholder='name' />
                                                        {
                                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                                        }
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="email" className='form-label'>Email</label>
                                                        <input
                                                            {
                                                            ...register('email')
                                                            }
                                                            type="text" value={userInfo ? userInfo.email : ''} name='email' className={`form-control ${errors.email && 'is-invalid'}`} placeholder='email' />
                                                        {
                                                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="address" className='form-label'>Address</label>
                                                <textarea
                                                    {
                                                    ...register('address', {
                                                        required: 'The Address Field Is Required'
                                                    })
                                                    }
                                                    name="address" id="address" placeholder='address' className={`form-control mb-1 ${errors.address && 'is-invalid'}`} defaultValue={userInfo ? userInfo.address : ''} rows={5}></textarea>
                                                {
                                                    errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                                }
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="phone" className='form-label'>Phone</label>
                                                        <input
                                                            {
                                                            ...register('phone', {
                                                                required: 'The Phone Feild Is Required'
                                                            })
                                                            }
                                                            type="text" value={userInfo ? userInfo.phone : ''} name='phone' className={`form-control ${errors.phone && 'is-invalid'}`} placeholder='phone' />
                                                        {
                                                            errors.phone && <p className='invalid-feedback'>{errors.phone?.message}</p>
                                                        }
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="city" className='form-label'>City</label>
                                                        <input
                                                            {
                                                            ...register('city', {
                                                                required: 'The City Feild Is Required'
                                                            })
                                                            }
                                                            type="text" value={userInfo ? userInfo.city : ''} name='city' className={`form-control ${errors.city && 'is-invalid'}`} placeholder='city' />
                                                        {
                                                            errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="zip" className='form-label'>Zip</label>
                                                        <input
                                                            {
                                                            ...register('zip', {
                                                                required: 'The Zip Feild Is Required'
                                                            })
                                                            }
                                                            type="text" value={userInfo ? userInfo.zip : ''} name='zip' className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='zip' />
                                                        {
                                                            errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                                        }
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="state" className='form-label'>State</label>
                                                        <input
                                                            {
                                                            ...register('state', {
                                                                required: 'The State Feild Is Required'
                                                            })
                                                            }
                                                            type="text" value={userInfo ? userInfo.state : ''} name='state' className={`form-control ${errors.state && 'is-invalid'}`} placeholder='state' />
                                                        {
                                                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='btn btn-info text-white'>Submit</button>
                                    </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserInfo