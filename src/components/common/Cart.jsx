import React, { useCallback, useContext } from "react";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";
import Loader from "./Loader";
import { apiUrl } from "./Http";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
const Cart = () => {
    const { cart, loadingCart } = useContext(CartContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (!cart || !cart.cartDetail || cart.cartDetail.items.length === 0) {
            toast.error("Your cart is empty! Please add items before checkout.", {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: false,
                draggable: true,
                theme: 'colored'
            });
            return;
        }
        navigate('/checkout');
    }
    const removeItem = async (id) => {
        const res = await fetch(`${apiUrl}/remove-item-from-cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
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
                draggable: true,
                theme: "colored"
            });
            queryClient.invalidateQueries(['cart']);
        }
    }
    const handleQuantityChange = useCallback(async (id, qty) => {
        const res = await fetch(`${apiUrl}/increment-quantity`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                quantity: qty
            }),
            credentials: 'include'
        });

        const result = await res.json();
        if (result.status === 200) {
            queryClient.invalidateQueries(['cart']);
            return result.data
        }
        return []
    }, [])
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">cart</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <h2 className="border-bottom py-3">Cart</h2>
                        {
                            loadingCart ? <Loader /> : (cart && cart?.cartDetail?.items?.length > 0 ?
                                <table className="table">
                                    <tbody>
                                        {
                                            cart.cartDetail.items.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td width={100}>
                                                            <img src={item.product.image_url} alt="" width={80} />
                                                        </td>
                                                        <td width={600}>
                                                            <h4 className="mb-3">{item.product.title}</h4>
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <span>${item.price}</span>
                                                                <button className="btn btn-size">{item.size}</button>
                                                            </div>
                                                        </td>
                                                        <td valign="middle">
                                                            <input style={{ width: '100px' }} value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} min={1} type="number" className="form-control" />
                                                        </td>
                                                        <td valign="middle" >
                                                            <button onClick={() => removeItem(item.id)} type={'button'} className={'cursor-pointer text-gray-600 hover:text-red-600 border-0 bg-transparent'}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 cursor-pointer" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className="text-center p-3">
                                    🛒 Cart Is Empty
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="row justify-content-end mb-4">
                    <div className="col-xl-3">
                        <div className="d-flex justify-content-between border-bottom p-2">
                            <div><strong>SubTotal</strong></div>
                            <div>${cart.subtotal ? cart.subtotal : 0}</div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom p-2">
                            <div><strong>Shipping</strong></div>
                            <div>${cart.shipping ? cart.shipping : 0}</div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom p-2">
                            <div><strong>Tax</strong></div>
                            <div>${cart.tax ? cart.tax : 0}</div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom p-2">
                            <div><strong>Grand Total</strong></div>
                            <div>${cart.total ? cart.total : 0}</div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={handleCheckout} className="btn btn-primary">Process To Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
