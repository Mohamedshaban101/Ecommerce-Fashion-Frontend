import React, { useContext } from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar';

const Dashboard = () => {
  return (
    <Layout>
        <div className='container dashboard py-5'>
            <h3>Dashboard</h3>
            <div className='row'>
                <div className='col-lg-3 shadow rounded p-3'>
                    <Sidebar />     
                </div>
                <div className='col-lg-9'>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='card shadow'>
                                <div className='card-info p-3'>
                                    <h3>1</h3>
                                    <span>Users</span>
                                </div>
                                <div className='card-footer'>
                                    <a href="#">View Users</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='card shadow'>
                                <div className='card-info p-3'>
                                    <h3>13</h3>
                                    <span>Orders</span>
                                </div>
                                <div className='card-footer'>
                                    <a href="#">View Orders</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='card shadow'>
                                <div className='card-info p-3'>
                                    <h3>24</h3>
                                    <span>Products</span>
                                </div>
                                <div className='card-footer'>
                                    <a href="#">View Products</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard