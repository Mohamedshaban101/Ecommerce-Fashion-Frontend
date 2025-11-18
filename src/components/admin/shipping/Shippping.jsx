import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { apiUrl } from '../../common/Http';
import Layout from '../../common/Layout';
import Loader from '../../common/Loader';
import Sidebar from '../../common/Sidebar';

const Shippping = () => {
    
    const fetchShippings = async () => {
        const res = await fetch(`${apiUrl}/admin/shipping`, {
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
    const { data: shipping = null, isLoading: loadingShipping } = useQuery({
        queryKey: ['shipping'],
        queryFn: fetchShippings
    });
    const deleteShipping = async () => {
        const res = await fetch(`${apiUrl}/admin/shipping/delete`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
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
        } else {
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
                <h3>Shippings</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className="row">
                            <div className='col-xl-12 d-flex justify-content-end mb-3'>
                                <Link to={'/admin/shipping/create'} className='btn btn-info text-white'>Create</Link>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-12'>
                                <div className="card p-4 shadow">
                                    {
                                        loadingShipping ? <Loader /> : (shipping ? <table className='table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th width={50}>ID</th>
                                                    <th>Shipping</th>
                                                    <th width={100}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{shipping.id}</td>
                                                    <td>{shipping.shipping_charge}</td>
                                                    <td>
                                                        <Link onClick={() => deleteShipping()} className='ms-3 text-danger'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                            </svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                            :
                                            <div className='text-danger'>No Shipping</div>
                                        )
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

export default Shippping