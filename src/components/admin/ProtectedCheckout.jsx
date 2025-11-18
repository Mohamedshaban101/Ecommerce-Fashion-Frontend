import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import Loader from '../common/Loader';
import { CartContext } from '../context/Cart'

const ProtectedCheckout = ({children}) => {
    const {cart , loadingCart} = useContext(CartContext);

    if(loadingCart){
        return <Loader />
    }
    if (!cart || !cart?.cartDetail || cart?.cartDetail?.items?.length === 0) {
        return <Navigate to="/cart" replace />;
      }
  return children;
}

export default ProtectedCheckout