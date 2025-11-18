import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import {apiUrl} from '../common/Http';
import { toast } from "react-toastify";
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/register` , {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json' 
        },
        body : JSON.stringify(data),
    }).then(res => {
        const status = res.status;
        return res.json().then(result => ({status , result}))
    }
    ).then(({result , status}) => {
        if(status === 200){
            navigate('/login');
        }else{
            toast.error(result.message , {
                position : 'top-right',
                autoClose : 3000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                theme : 'colored'
            });
        }
    });
  };
  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className="login m-5 shadow p-4 rounded"
          style={{ width: "400px" }}
        >
          <div className="login-content">
            <h3>Register</h3>
            <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label htmlFor="name" className="mb-2">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "The Name Feild Is Required"
                  })}
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className={`form-control ${errors.name && "is-invalid"}`}
                />
                {errors.name && (
                  <p className="invalid-feedback">{errors.name?.message}</p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The Email Field Is Required",
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
                  {...register("password", {
                    required: "The Password Feild Is Required",
                  })}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password_confirmation" className="mb-2">
                  Confirm Password
                </label>
                <input
                  {...register("password_confirmation", {
                    required: "The Confirm Password Feild Is Required",
                  })}
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Password Confirmation"
                  className={`form-control ${errors.cpassword && "is-invalid"}`}
                />
                {
                    errors.password_confirmation && <p className="invalid-feedback">{errors.password_confirmation?.message}</p>
                }
              </div>
              <div className="form-group mb-4">
                <button className="btn btn-primary form-control">
                  Register
                </button>
              </div>
              <div className="form-group">
                <p>
                  Already Have Account?{" "}
                  <Link to={"/login"} className="ms-1 block text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
