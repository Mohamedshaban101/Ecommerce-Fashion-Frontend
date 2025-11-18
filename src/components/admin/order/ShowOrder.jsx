import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/Http';
import Layout from '../../common/Layout';
import Loader from '../../common/Loader';
import Sidebar from '../../common/Sidebar';

const ShowOrder = () => {
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [paymentStatus , setPaymentStatus] = useState('unpaid');
    const [status , setStatus] = useState('pending');
    const updateOrder = async () => {
        const res = await fetch(`${apiUrl}/admin/order/${params.id}` , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                status : status,
                payment_status : paymentStatus
            }),
            credentials : 'include'
        });

        const result = await res.json();
        if(result.status === 200){
            toast.success(result.message , {
                position : 'top-right',
                autoClose : 3000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                theme : "colored"
            })
            queryClient.invalidateQueries(['order']);
        }else{
            toast.error(result.message , {
                position : 'top-right',
                autoClose : 3000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                theme : "colored"
            })
        }
    }
    const fetchOrders = async () => {
        const res = await fetch(`${apiUrl}/admin/order/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const result = await res.json();
        if (result.status == 200) {
            return result.data
        }
        if(result.status == 404){
            navigate('/not-found');
        }
        return [];
    }
    const { data: order = [], isLoading: loadingOrders } = useQuery({
        queryKey: ['order'],
        queryFn: fetchOrders
    });    
    return (
        <Layout>
            <div className='container py-5'>
                <h3>Products</h3>
                <div className="row">
                    <div className="col-lg-3">
                        <div className='card shadow'>
                            <div className='card-body p-4'>
                                <Sidebar />
                            </div>
                        </div>
                    </div>

                    {
                        loadingOrders ? <Loader /> : <div className="col-lg-9">
                            <div className="row">
                                <div className="col-xl-9">
                                    <div className='card shadow'>
                                        <div className='card-body p-4'>
                                            <div className='row mb-3'>
                                                <div className='col-xl-4'>
                                                    <h3>Order:#{order.id}</h3>
                                                    {
                                                        order.status == 'pending' && <span className='badge text-bg-warning'>Pending</span>
                                                    }
                                                    {
                                                        order.status == 'delivered' && <span className='badge text-bg-success'>Delivered</span>
                                                    }
                                                    {
                                                        order.status == 'shipped' && <span className='badge text-bg-warning'>Shipped</span>
                                                    }
                                                    {
                                                        order.status == 'cancelled' && <span className='badge text-bg-danger'>Cancelled</span>
                                                    }
                                                </div>
                                                <div className='col-xl-4'>
                                                    <h3 className='text-secondary'>Date</h3>
                                                    <span className='pt-2'>{dayjs(order.created_at).format('DD MM YYYY, hh:mm A')}</span>
                                                </div>
                                                <div className='col-xl-4'>
                                                    <h3 className='text-secondary'>Payment Status</h3>
                                                    {
                                                        order.payment_status == 'paid' && <span className={'badge text-bg-success'}>paid</span>
                                                    }
                                                    {
                                                        order.payment_status == 'unpaid' && <span className={'badge text-bg-danger'}>no paid</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-xl-4'>
                                                    <div className='py-3'>
                                                        <strong>{order.user.name}</strong>
                                                        <p>{order.user.email}</p>
                                                        <p>{order.user.user_information.address},{order.user.user_information.city},{order.user.user_information.state},{order.user.user_information.zip}</p>
                                                    </div>
                                                </div>
                                                <div className='col-xl-4'>
                                                    <h3 className='text-secondary'>Payment Method</h3>
                                                    {
                                                        order.payment_method == 'stripe' && <span className='badge text-bg-success'>Stripe</span>
                                                    }
                                                    {
                                                        order.payment_method == 'COD' && <span className='badge text-bg-success'>COD</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="row pt-5">
                                                <h3 className="pb-2 "><strong>Items</strong></h3>
                                                <div className="row justify-content-end">
                                                    {
                                                        loadingOrders ? <Loader /> : (order && order?.items?.length > 0 && order.items.map((item , index) => {
                                                            return (
                                                                <div className="col-lg-12" key={index}>
                                                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                        <div className="d-flex">
                                                                            <img width="70" className="me-3" src={item.product.image_url} alt=""></img>
                                                                            <div className="d-flex flex-column">
                                                                                <div className="mb-2"><span>{item.product.title}</span></div>
                                                                                <div><button className="btn btn-size">{item.size}</button></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <div>X {item.quantity}</div>
                                                                            <div className="ps-3">${item.price}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }))
                                                    }
                                                </div>
                                                <div className="row justify-content-end">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Subtotal</div>
                                                            <div>${order.subtotal}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Shipping</div>
                                                            <div>${order.shipping}</div>
                                                        </div>
                                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div><strong>Grand Total</strong></div>
                                                            <div>${order.total}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className='card shadow'>
                                        <div className='card-body p-4'>
                                            <form action="" className='form' onSubmit={handleSubmit(updateOrder)}>
                                                <div className='form-group mb-3'>
                                                    <label htmlFor="status" className='form-label'>Status</label>
                                                    <select
                                                        {
                                                            ...register('status')
                                                        }
                                                    onChange={(e) => setStatus(e.target.value)} value={status} name="status" id="status" className={`form-select ${errors.status && 'is-invalid'}`}>
                                                        <option value="pending">Pendding</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                {
                                                    errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                                }
                                                <div className='form-group mb-3'>
                                                    <label htmlFor="payment_status" className='form-label'>Payment Status</label>
                                                    <select
                                                    {
                                                        ...register('payment_status')
                                                    }
                                                       onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus} name="payment_status" id="payment_status" className={`form-select ${errors.payment_status && 'is-invalid'}`}>
                                                        <option value="unpaid">No Paid</option>
                                                        <option value="paid">Paid</option>
                                                    </select>
                                                </div>
                                                {
                                                    errors.payment_status && <p className='invalid-feedback'>{errors.payment_status?.message}</p>
                                                }
                                                <button type='submit' className='btn btn-info'>Update</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ShowOrder