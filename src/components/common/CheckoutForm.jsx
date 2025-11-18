import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CartContext } from "../context/Cart";
import Loader from "./Loader";
import { apiUrl } from "./Http";
import { toast } from "react-toastify";
import { CheckFlowContext } from "../context/CheckFlow";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
export const CheckoutForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const { cart, loadingCart } = useContext(CartContext);
    const { setCameFromCheckout } = useContext(CheckFlowContext)
    const [paymentStatus , setPaymentStatus] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const processOrder = async (data) => {
        if (paymentMethod === 'COD') {
            saveOrder(data);
        } else {
            const response = await fetch(`${apiUrl}/create-payment-intent`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ amount: cart.total * 100 }),
            });

            const result = await response.json();
            
            if (!result.clientSecret) {
                setPaymentStatus("Unable to process payment. Please try again.");
                // setLoading(false);
                return;
            }

            // Ensure Stripe and Elements are loaded
            if (!stripe || !elements) {
                setPaymentStatus("Stripe is not ready. Please try again later.");
                // setLoading(false);
                return;
            }

            const clientSecret = result.clientSecret;
            const cardElement = elements.getElement(CardElement);

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: data.name, email: data.email },
                },
            });

            if (paymentResult.error) {
                setPaymentStatus(`Payment failed: ${paymentResult.error.message}`);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                saveOrder(data);
                setPaymentStatus("Payment successful!");
            }

        }
    }
    const saveOrder = async (data) => {
        const formData = { ...data, status: 'pending', payment_method: paymentMethod };
        const res = await fetch(`${apiUrl}/checkout`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (result.status === 200) {
            navigate(`/order/confirmation/${result.data.id}`);
            setCameFromCheckout(true);
            toast.success(result.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
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
    }
    return (
        <div className="container checkout">
            <div className="row">
                <div className="col-xl-12">
                    <nav aria-label="breadcrumb" className="py-4">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Checkout
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-7">
                    <h3 className="border-bottom pb-2 mb-3">
                        <strong>Billing Details</strong>
                    </h3>
                    <form action="" className='form'>
                        <div className='shadow p-4 rounded mb-4'>
                            <div className='form-group mb-3'>
                                <div className='row'>
                                    <div className='col-xl-6'>
                                        <label htmlFor="name" className='form-label'>Name</label>
                                        <input
                                            {
                                            ...register('name')
                                            }
                                            type="text" name='name' className={`form-control ${errors.name && 'is-invalid'}`} placeholder='name' />
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
                                            type="text" name='email' className={`form-control ${errors.email && 'is-invalid'}`} placeholder='email' />
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
                                    name="address" id="address" placeholder='address' className={`form-control mb-1 ${errors.address && 'is-invalid'}`} rows={5}></textarea>
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
                                            type="text" name='phone' className={`form-control ${errors.phone && 'is-invalid'}`} placeholder='phone' />
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
                                            type="text" name='city' className={`form-control ${errors.city && 'is-invalid'}`} placeholder='city' />
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
                                            type="text" name='zip' className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='zip' />
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
                                            type="text" name='state' className={`form-control ${errors.state && 'is-invalid'}`} placeholder='state' />
                                        {
                                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-xl-5">
                    <h3 className="border-bottom pb-2 mb-3">
                        <strong>Items</strong>
                    </h3>
                    {
                        loadingCart ? <Loader /> :
                            cart && cart?.cartDetail?.items?.length > 0 &&
                            <table className="table">
                                <tbody>
                                    {
                                        cart.cartDetail.items.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td width={100}>
                                                        <img src={item.product.image_url} width={80} alt="" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4 className="mb-3">{item.product.title}</h4>
                                                        <div className="d-flex gap-2 align-items-center">
                                                            <span>${item.price}</span>
                                                            <button className="btn btn-size">{item.size}</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                    }
                    <div className="row mb-4">
                        <div className="col-xl-12">
                            <div className="d-flex justify-content-between border-bottom p-2">
                                <div>
                                    <strong>SubTotal</strong>
                                </div>
                                <div>${cart.subtotal}</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom p-2">
                                <div>
                                    <strong>Shipping</strong>
                                </div>
                                <div>${cart.shipping}</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom p-2">
                                <div>
                                    <strong>Grand Total</strong>
                                </div>
                                <div>${cart.total}</div>
                            </div>
                            <div className="mt-4">
                                <h3 className="border-bottom pb-2 mb-3"><strong>Payment Methods</strong></h3>
                                <div className="d-flex gap-3">
                                    <div className="">
                                        <input type="radio" value={'stripe'} defaultChecked={paymentMethod == 'stripe'} onClick={(e) => setPaymentMethod(e.target.value)} name="pay" id="stripe" />
                                        <label htmlFor="stripe" style={{ marginLeft: '5px' }}>Stripe</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="pay" id="stripe" value={'COD'} defaultChecked={paymentMethod == 'cod'} onClick={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="stripe" style={{ marginLeft: '5px' }}>COD</label>
                                    </div>
                                </div>
                            </div>
                            {
                                paymentMethod == "stripe" && <div className='border p-3'>
                                    <CardElement />
                                </div>
                            }
                            <div className="add-to-cart mt-3">
                                <button type={'submit'} className="btn btn-primary" onClick={handleSubmit(processOrder)}>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

