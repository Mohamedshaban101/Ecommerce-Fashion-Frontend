import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import { data, Link, Navigate, useParams } from 'react-router';
import { CheckFlowContext } from '../context/CheckFlow';
import { apiUrl } from './Http';
import Layout from './Layout'
import Loader from './Loader';

const Confirmation = () => {
    const params = useParams();
    const {cameFromCheckout , setCameFromCheckout} = useContext(CheckFlowContext);
    const [checked , setChecked] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        if(cameFromCheckout){
            setChecked(true);
            setCameFromCheckout(false);
        }
    },[]);
    if(!cameFromCheckout){
        if(!checked){
            return <Navigate to={'/checkout'} replace/>
        }
    }
    const fetchOrder = async () => {
        const res = await fetch(`${apiUrl}/order/confirmation/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        const result = await res.json();
        if (result.status == 200) {
            queryClient.invalidateQueries(['cart']);
            return result.data;
        }
        return [];
    }
    const { data: order = null, isLoading: loadingOrder } = useQuery({
        queryKey: ['order'],
        queryFn: fetchOrder
    });
    return (
        <Layout>
            {
                loadingOrder ? <Loader /> : <div className='container p-5'>
                    <div className='row'>
                        <h1 className='text-center fw-bold text-success'>Thank You!</h1>
                        <p className='text-muted text-center'>Your Order has been successfully placed.</p>
                    </div>
                    <div className='card shadow p-3'>
                        <div className='card-body'>
                            <h3 className='fw-bold'>Order Summary</h3>
                            <hr />
                            <div className='row'>
                                <div className='col-xl-6'>
                                    <p><strong>Order ID: </strong> #{order.id}</p>
                                    <p><strong>Date: </strong> {dayjs(order.created_at).format('DD MMM YYYY')}</p>
                                    <p><strong>Status:
                                        {
                                            order.status == 'pending' && <span className='badge text-bg-warning'> Pending</span>
                                        }
                                        {
                                            order.status == 'shipped' && <span className='badge text-bg-warning'> Shipped</span>
                                        }
                                        {
                                            order.status == 'delivered' && <span className='badge text-bg-success'> Delivered</span>
                                        }
                                        {
                                            order.status == 'cancelled' && <span className='badge text-bg-danger'> Cancelled</span>
                                        }
                                    </strong>
                                        <span className='badge text-success'></span></p>
                                    <p>Payment Method:
                                        {order.payment_method == 'stripe' && <strong>Stripe</strong>}
                                        {order.payment_method == 'COD' && <strong>COD</strong>}
                                    </p>
                                </div>
                                <div className='col-xl-6'>
                                    <p><strong>Customer: </strong>{order.user.name}</p>
                                    <p><strong>Address: </strong>{order.user.user_information.address}</p>
                                    <p><strong>Contact: </strong>{order.user.user_information.phone}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-xl-12'>
                                    <table className='table-striped table-bordered table'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                loadingOrder ? <Loader /> : order.items.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.product.title}</td>
                                                            <td>{item.product.price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className='text-end' colSpan='3'>Subtotal</td>
                                                <td>${order.subtotal}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-end' colSpan='3'>Shipping</td>
                                                <td>${order.shipping}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-end' colSpan='3'>Grand Total</td>
                                                <td>${order.total}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-primary'>Veiw Order Details</button>
                                    <Link to='/shop' className='btn btn-secondary ms-2'>Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Confirmation