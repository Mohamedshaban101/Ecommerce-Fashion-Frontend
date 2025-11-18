import React from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../../common/Http'
import { toast } from 'react-toastify'

const CreateCategory = () => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  const saveCategory = async (data) => {
    const res = await fetch(`${apiUrl}/admin/categories/create` , {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
      },
      credentials: 'include', 
      body : JSON.stringify(data)
    }).then(res => {
      const status = res.status;
      return res.json().then(result => ({ status, result }));
    }).then(({result , status})=> {
      if(status === 200){
        toast.success(result.message , {
          position : 'top-right',
          autoClose : 3000,
          hideProgressBar : false,
          closeOnClick : true,
          draggable : true,
          pauseOnHover : true,
          theme : 'colored'
        });
      }else{
        toast.error(result.message , {
          position : 'top-right',
          autoClose : 3000,
          hideProgressBar : false,
          closeOnClick : true,
          draggable : true,
          pauseOnHover : true,
          theme : 'colored'
        });
      }
    });
  }
  return (
    <Layout>
      <div className='container categories py-5'>
        <h3>Categories</h3>
        <div className='row'>
          <div className='col-lg-3 shadow rounded p-3 mb-4'>
            <Sidebar />
          </div>
          <div className='col-lg-9'>
            <div className="row">
              <div className='col-xl-12 d-flex justify-content-end mb-3'>
                <Link to={'/admin/categories'} className='btn btn-info text-white'>Back</Link>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='create-category'>
                  <form action="" className='form' onSubmit={handleSubmit(saveCategory)}>
                    <div className='shadow p-4 rounded mb-4'>
                      <div className='form-group mb-3'>
                        <label htmlFor="name" className='mb-1'>Name</label>
                        <input 
                          {
                            ...register('name' , {
                              required : 'The Name Feild Is Required'
                            })
                          }
                        type="text" id='name' name='name' className={`form-control ${errors.name && 'is-invalid'}`} />
                        {
                          errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                        }
                      </div>
                      <div className='form-group mb-3'>
                        <label htmlFor="status" className='mb-1'>Status</label>
                        <select 
                        {
                          ...register('status' , {
                            required : 'The Status Feild Is Required'
                          })
                        }
                        name="status" id="status" className={`form-control ${errors.status && 'is-invalid'}`}>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {
                          errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                        }
                      </div>
                    </div>
                    <button className='btn btn-info text-white'>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory