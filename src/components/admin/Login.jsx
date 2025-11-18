import React, { useContext, useEffect, useState } from "react";
import Layout from "../common/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../context/AdminAuth";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../common/Loader";
const Login = () => {
  const { loadingUser } = useContext(AdminAuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status === 200) {
      const me = await fetch(`${apiUrl}/me`, {
        credentials: 'include',
      });
      const meData = await me.json();
      if (me.ok) {
        queryClient.setQueryData(['user'] , meData.user);
        queryClient.invalidateQueries(['user']);
        navigate('/admin/dashboard');
      }
    } else if(result.status === 403){
      toast.error(result.message, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      })
    }
  }
  const loginWithGoogle = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };
  return (
    <Layout>
      {
      loadingUser ? <Loader /> : <div className="container d-flex justify-content-center align-items-center">
        <div
          className="login m-5 shadow p-4 rounded"
          style={{ width: "400px" }}
        >
          <div className="login-content">
            <h3>Admin Login</h3>
            <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The Email Feild Is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <input
                  {
                  ...register('password', {
                    required: 'The Password Feild Is Required'
                  })
                  }
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                />
                {
                  errors.password && <p className="invalid-feedback">{errors.password?.message}</p>
                }
              </div>
              <div className="form-group mb-4">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="form-group">
                <Link to={"/register"} className="ms-1 block text-primary">
                  Create New Account
                </Link>
              </div>
            </form>
            <button onClick={loginWithGoogle} className="btn btn-primary mt-3">Sign in with google</button>
          </div>
        </div>
      </div>
      }
    </Layout>
  );
};
export default Login;
