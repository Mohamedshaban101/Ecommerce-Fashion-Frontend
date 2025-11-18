import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {apiUrl } from '../../common/Http';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { toast } from 'react-toastify';

const EditBrand = () => {
    const [category, setCategory] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            status: ''
        }
    });
    const params = useParams();
    useEffect(() => {
        const fetchBrand = async () => {
            const res = await fetch(`${apiUrl}/admin/brands/show/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include', 
            }).then(res => res.json()).then(result => {
                if (result.status == 200) {
                    setCategory(result.data);
                    reset({
                        name: result.data.name,
                        status: result.data.status
                    });
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
            });
        }
        fetchBrand();
    }, [params.id , reset]);
    const editBrand = async (data) => {
        const res = await fetch(`${apiUrl}/admin/brands/edit/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            if (result.status == 200) {
                toast.success(result.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    pauseOnHover: true,
                    theme: 'colored'
                })
            } else {
                toast.error(result.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    pauseOnHover: true,
                    theme: 'colored'
                })
            }
        })
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
                                <Link to={'/admin/brands'} className='btn btn-info text-white'>Back</Link>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='create-category'>
                                    <form action="" className='form' onSubmit={handleSubmit(editBrand)}>
                                        <div className='shadow p-4 rounded mb-4'>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="name" className='mb-1'>Name</label>
                                                <input
                                                    {
                                                    ...register('name', {
                                                        required: 'The Name Feild Is Required'
                                                    })
                                                    }
                                                    type="text" id='name' name='name' className={`form-control ${errors.name && 'is-invalid'}`} />
                                                {
                                                    errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                                }
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="status" className='mb-1'>Status</label>
                                                <select
                                                    {
                                                    ...register('status', {
                                                        required: 'The Status Feild Is Required'
                                                    })
                                                    }
                                                    name="status" id="status" className={`form-control ${errors.status && 'is-invalid'}`}>
                                                    <option value="1">Active</option>
                                                    <option value="0">Block</option>
                                                </select>
                                                {
                                                    errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
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

export default EditBrand;