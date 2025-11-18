import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/common/Product'
import Cart from './components/common/Cart'
import Login from './components/admin/Login'
import Register from './components/admin/Register'
import { ToastContainer } from 'react-toastify'
import AdminRequiredAuth from './components/admin/AdminRequiredAuth';
import UserRequiredAuth from './components/admin/UserRequiredAuth';
import Dashboard from './components/admin/Dashboard'
import { default as ShowCategories } from './components/admin/category/Category';
import { default as CreateCategory } from './components/admin/category/CreateCategory';
import { default as EditCategory } from './components/admin/category/EditCategory';

import { default as ShowBrands } from './components/admin/brand/Brand';
import { default as CreateBrand } from './components/admin/brand/CreateBrand';
import { default as EditBrand } from './components/admin/brand/EditBrand';

import { default as ShowProducts } from './components/admin/product/Product';
import { default as CreateProduct } from './components/admin/product/CreateProduct';
import { default as EditProduct } from './components/admin/product/EditProduct';
import { default as ShowUsers } from './components/admin/user/User';
import { default as ShowShipping } from './components/admin/shipping/Shippping';
import { default as CreateShipping } from './components/admin/shipping/CreateShipping';
import { default as Account } from './components/admin/user/UserInfo';
import { default as ChangePassword } from './components/admin/user/ChangePassword';
import {default as Order } from './components/admin/order/Order';
import {default as OrderUser } from './components/admin/user/Order';
import {default as UpdateOrderUser} from './components/admin/order/ShowOrder';
import {default as ShowOrderUser} from './components/admin/order/ShowOrder';
import {default as NotFound} from './components/common/NotFound';
import {  Checkout } from './components/common/Checkout';
import {default as Confirmation} from './components/common/Confirmation';
import GuestRoute from './components/admin/GuestRoute'
import ProtectedCheckout from './components/admin/ProtectedCheckout'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={
          <UserRequiredAuth>
            <Cart />
          </UserRequiredAuth>
        } />
        <Route path='/account' element={
          <UserRequiredAuth>
            <Account />
          </UserRequiredAuth>
        } />

        <Route path='/account/change-password' element={
          <UserRequiredAuth>
            <ChangePassword />
          </UserRequiredAuth>
        } />
        <Route path='/account/orders' element={
          <UserRequiredAuth>
            <OrderUser />
          </UserRequiredAuth>
        } />
        <Route path='/checkout' element={
          <UserRequiredAuth>
            <ProtectedCheckout>
                <Checkout />
            </ProtectedCheckout>
          </UserRequiredAuth>
        } />
        <Route path='/order/confirmation/:id' element={
          <UserRequiredAuth>
            <Confirmation />
          </UserRequiredAuth>
        } />
        <Route path='/login' element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path='/register' element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
        <Route path='/admin/dashboard' element={
          <AdminRequiredAuth>
            <Dashboard />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/categories' element={
          <AdminRequiredAuth>
            <ShowCategories />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/categories/create' element={
          <AdminRequiredAuth>
            <CreateCategory />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/categories/edit/:id' element={
          <AdminRequiredAuth>
            <EditCategory />
          </AdminRequiredAuth>
        } />

        <Route path='/admin/brands' element={
          <AdminRequiredAuth>
            <ShowBrands />
          </AdminRequiredAuth>
        } />

        <Route path='/admin/brands/create' element={
          <AdminRequiredAuth>
            <CreateBrand />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/brands/edit/:id'} element={
          <AdminRequiredAuth>
            <EditBrand />
          </AdminRequiredAuth>
        } />


        <Route path='/admin/products' element={
          <AdminRequiredAuth>
            <ShowProducts />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/products/create' element={
          <AdminRequiredAuth>
            <CreateProduct />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/products/edit/:id' element={
          <AdminRequiredAuth>
            <EditProduct />
          </AdminRequiredAuth>
        } />
        <Route path='/admin/users' element={
          <AdminRequiredAuth>
            <ShowUsers />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/shipping'} element={
          <AdminRequiredAuth>
            <ShowShipping />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/shipping/create'} element={
          <AdminRequiredAuth>
            <CreateShipping />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/orders'} element={
          <AdminRequiredAuth>
            <Order />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/order/:id'} element={
          <AdminRequiredAuth>
            <UpdateOrderUser />
          </AdminRequiredAuth>
        } />
        <Route path={'/admin/order/:id'} element={
          <AdminRequiredAuth>
            <ShowOrderUser />
          </AdminRequiredAuth>
        } />
        <Route path={'/not-found'} element={
          <NotFound />
        } />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App