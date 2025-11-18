import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react'
import { Link } from 'react-router';
import { apiUrl } from '../../common/Http';
import Layout from '../../common/Layout';
import Loader from '../../common/Loader';
import Sidebar from '../../common/Sidebar';

const Order = () => {
    const fetchOrders = async () => {
        const res = await fetch(`${apiUrl}/admin/orders` , {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            credentials : 'include'
        });
        const result = await res.json();
        if(result.status == 200){
            return result.data;
        }
        return [];
    }
    const {data : orders = [] , isLoading : loadingOrders} = useQuery({
        queryKey : ['orders'],
        queryFn : fetchOrders
    });
  return (
    <Layout>
            <div className='container products py-5'>
                <h3>Products</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-xl-12'>
                                <div className="card p-4 shadow">
                                    {
                                        loadingOrders ? <Loader /> :
                                            orders && orders.length > 0 &&

                                            <table className='table table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th width={50}>ID</th>
                                                        <th>Customer</th>
                                                        <th>Email</th>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                        <th>Payment</th>
                                                        <th width={100}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orders.map((order, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td><Link to={`/admin/order/${order.id}`}>{order.id}</Link></td>
                                                                    <td>{order.user.name}</td>
                                                                    <td>{order.user.email}</td>
                                                                    <td>${order.total}</td>
                                                                    <td>{dayjs(order.created_at).format('DD MMM YYYY, hh:mm A')}</td>
                                                                    <td>
                                                                        {
                                                                            order.payment_status == 'paid' ? <span className='badge text-bg-success'>paid</span> : <span className='badge text-bg-danger'>no paid</span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            order.status == 'pending' ? <span className='badge text-bg-warning'>pending</span> : <span className='badge text-bg-success'>Delivered</span>
                                                                        }
                                                                    </td>
                                                                    
                                                                </tr>
                                                            );
                                                        })
                                                    }

                                                </tbody>
                                            </table>
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

export default Order