import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { apiUrl } from '../../common/Http'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'

const CreateShipping = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const saveShipping = async (data) => {
        const res = await fetch(`${apiUrl}/admin/shipping/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        const result = await res.json();
        if (result.status == 200) {
            toast.success(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }else{
            toast.error(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }
    }

    return (
        <Layout>
            <div className='container brand py-5'>
                <h3>Brands</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className="row">
                            <div className='col-xl-12 d-flex justify-content-end mb-3'>
                                <Link to={'/admin/shipping'} className='btn btn-info text-white'>Back</Link>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='create-category'>
                                    <form action="" className='form' onSubmit={handleSubmit(saveShipping)}>
                                        <div className='shadow p-4 rounded mb-4'>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="name" className='mb-1'>Shipping</label>
                                                <input
                                                    {
                                                    ...register('shipping_charge', {
                                                        required: 'The Shipping Feild Is Required'
                                                    })
                                                    }
                                                    type="text" id='shipping' name='shipping_charge' className={`form-control ${errors.shipping_charge && 'is-invalid'}`} />
                                                {
                                                    errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                                                }
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

export default CreateShipping