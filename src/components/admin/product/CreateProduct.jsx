import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../../common/Http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react';
import { useQuery } from '@tanstack/react-query'
import Loader from '../../common/Loader'
const CreateProduct = ({ placeholder }) => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const editor = useRef(null);
    const [description, setDescription] = useState('');
    const [gallery, setGallery] = useState([]);
    const [galleryImage, setGalleryImage] = useState([]);
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();
    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm();

    const saveProduct = async (data) => {
        const formData = { ...data, description, gallery }
        const res = await fetch(`${apiUrl}/admin/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        }).then(res => res.json()).then((result) => {
            if (result.status === 200) {
                toast.success(result.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                })
                navigate('/admin/products');
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
        })
    }
    const fetchCategories = async () => {
        const res = await fetch(`${apiUrl}/admin/categories`, {
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
        });
        const result = await res.json();
        if (result.status === 200) {
            setCategories(result.data);
            if (result.data.length === 0) {
                toast.info('You Must Create A Category First!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
                navigate('/admin/categories/create');
            }
            return result.data
        };
        return [];
    };

    const fetchBrands = async () => {
        const res = await fetch(`${apiUrl}/admin/brands`, {
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
        });
        const result = await res.json();
        if (result.status === 200) {
            setBrands(result.data);
            if (result.data.length === 0) {
                toast.info('You Must Create A Brand First!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
                navigate('/admin/categories/create');
            }
            return result.data
        };
        return [];
    };

    const fetchSizes = async () => {
        const res = await fetch(`${apiUrl}/admin/sizes`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        });
        const result = await res.json();
        if (result.status === 200) {
            setSizes(result.data);
            return result.data
        }
        return [];
    }
    const { data: categoriesData = [], isLoading: loadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data: brandsData = [], isLoading: loadingBrands } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands,
    });
    const { data: sizesData = [], isLoading: loadingSizes } = useQuery({
        queryKey: ['sizes'],
        queryFn: fetchSizes,
    });

    useEffect(() => {
        if (categories.length > 0) {
            setValue('category', categories[0].id);
        }
    }, [categories, setValue]);

    useEffect(() => {
        if (brands.length > 0) {
            setValue('brand', brands[0].id);
        }
    }, [brands, setValue]);

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append('image', file);

        const res = await fetch(`${apiUrl}/admin/temp-images`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            credentials: 'include',
            body: formData
        }).then(res => res.json()).then(result => {
            setGallery([...gallery, result.data.id]);
            setGalleryImage(prev => [...prev, result.data]);
            e.target.value = '';
        })
    }
    const deleteImage = (image) => {
        const newGalleryImage = galleryImage.filter(gallery => gallery != image);
        setGalleryImage(newGalleryImage);
    }
    return (
        <Layout>
            <div className='container brand py-5'>
                <h3>Products / Create</h3>
                <div className='row'>
                    <div className='col-lg-3 shadow rounded p-3 mb-4'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9'>
                        <div className="row">
                            <div className='col-xl-12 d-flex justify-content-end mb-3'>
                                <Link to={'/admin/products'} className='btn btn-info text-white'>Back</Link>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='create-category'>
                                    <form action="" className='form' onSubmit={handleSubmit(saveProduct)}>
                                        <div className='shadow p-4 rounded mb-4'>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="name" className='form-label'>Title</label>
                                                <input
                                                    {
                                                    ...register('title', {
                                                        required: 'The Title Feild Is Required'
                                                    })
                                                    }
                                                    type="text" name='title' className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Title' />
                                                {
                                                    errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                                }
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="category" className='form-label'>Category</label>
                                                        {
                                                            loadingCategories ? <Loader /> : (
                                                                <select
                                                                    {
                                                                    ...register('category')
                                                                    }
                                                                    name="category" id="category" className={`form-control ${errors.category && 'is-invalid'}`}>
                                                                    {
                                                                        categories && categories.map((category, index) => {
                                                                            return (
                                                                                <option key={index} value={category.id}>{category.name}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            )
                                                        }
                                                        {
                                                            errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>
                                                        }
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="brand" className='mb-1'>Brand</label>
                                                        {
                                                            loadingBrands ? <Loader /> : (
                                                                <select
                                                                    {
                                                                    ...register('brand')
                                                                    }
                                                                    name="brand" id="brand" className={`form-control ${errors.brand && 'is-invalid'}`}>
                                                                    {
                                                                        brands && brands.map((brand, index) => {
                                                                            return (
                                                                                <option key={index} value={brand.id}>{brand.name}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                    {
                                                                        errors.brand && <p className='invalid-feedback'>{errors.brand?.message}</p>
                                                                    }
                                                                </select>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="short_description" className='form-label'>Short Description</label>
                                                <textarea
                                                    {
                                                    ...register('short_description')
                                                    }
                                                    name="short_description" id="short_description" placeholder='Short Description' className='form-control mb-1' rows={5}></textarea>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="description">Description</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={description}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={newContent => setDescription(newContent.replace(/<[^>]+>/g, ''))} id='description' // preferred to use only this option to update the content for performance reasons
                                                />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <label htmlFor="price" className='form-label'>Price</label>
                                                        <input
                                                            {
                                                            ...register('price', {
                                                                required: 'The Price Feild Is Required'
                                                            })
                                                            }
                                                            type="text" name='price' id='price' placeholder='Price' className={`form-control ${errors.price && 'is-invalid'}`} />
                                                        {
                                                            errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
                                                        }
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="discount" className='form-label'>Discount Price</label>
                                                        <input
                                                            {
                                                            ...register('compare_price')
                                                            }
                                                            type="text" name='compare_price' placeholder='discount' className='form-control' id='discount' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <label htmlFor="sku" className='form-label'>SKU</label>
                                                        <input
                                                            {
                                                            ...register('sku', {
                                                                required: 'The SKU Feild Is Required'
                                                            })
                                                            }
                                                            type="text" name='sku' id='sku' placeholder='SKU' className={`form-control ${errors.sku && 'is-invalid'}`} />
                                                    </div>
                                                    {
                                                        errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
                                                    }
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="barcode" className='form-label'>Barcode</label>
                                                        <input
                                                            {
                                                            ...register('barcode')
                                                            }
                                                            type="text" name='barcode' placeholder='Barcode' className='form-control' id='barcode' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <label htmlFor="qty" className='form-label'>Qty</label>
                                                        <input
                                                            {
                                                            ...register('qty')
                                                            }
                                                            type="text" name='qty' id='qty' placeholder='Qty' className='form-control' />
                                                    </div>
                                                    <div className='col-xl-6'>
                                                        <label htmlFor="status" className='form-label'>Status</label>
                                                        <select
                                                            {
                                                            ...register('status')
                                                            }
                                                            name="status" id="status" className='form-control'>
                                                            <option value="1">Active</option>
                                                            <option value="0">Block</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <label htmlFor="is_featured" className='form-label'>Featured</label>
                                                        <select
                                                            {
                                                            ...register('is_featured')
                                                            }
                                                            name="is_featured" id="is_featured" className='form-control'>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </select>
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <label htmlFor="compare_price" className='form-label'>Compare_price</label>
                                                        <input
                                                            {
                                                            ...register('compare_price')
                                                            }
                                                            type="text" name='compare_price' id='compare_price' placeholder='Compare Price' className='form-control' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="image" className='form-label me-4 d-block'>Sizes</label>
                                                {
                                                    loadingSizes ? <Loader /> : (
                                                        sizes && sizes.map((size, index) => {
                                                            return (
                                                                <div className='form-check-inline' key={index}>
                                                                    <label htmlFor={`size-${size.id}`}>{size.name}</label>
                                                                    <input
                                                                        {
                                                                        ...register('sizes', {
                                                                            required: 'The Feild Sizes Is Required'
                                                                        })
                                                                        }
                                                                        type='checkbox' id={`size-${size.id}`} value={size.id} className={`form-check-input ms-1 ${errors.sizes && 'is-invalid'}`} />
                                                                    {
                                                                        errors.sizes && <p className='invalid-feedback'>{errors.sizes?.message}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    )
                                                }
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor="image" className='form-label'>Image</label>
                                                <input
                                                    onChange={handleFile}
                                                    type="file" className='form-control' />
                                            </div>
                                            <div className='mb-3'>
                                                <div className='row'>
                                                    {
                                                        galleryImage && galleryImage.map((image, index) => {
                                                            return (
                                                                <div className='col-lg-3' key={index}>
                                                                    <div className='card shadow p-2'>
                                                                        <img src={image.image_url} className='w-100 rounded mb-2' alt="" />
                                                                        <button className='btn btn-danger mb-2' onClick={() => deleteImage(image)}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
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

export default CreateProduct;