import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../../common/Http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react';
import { useQuery } from '@tanstack/react-query'
import Loader from '../../common/Loader'
const EditProduct = ({ placeholder }) => {
    const editor = useRef(null);
    const [description, setDescription] = useState('');
    const [gallery, setGallery] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );
    const params = useParams();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: async () => {
            try {
                const res = await fetch(`${apiUrl}/admin/products/show/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    credentials: 'include'
                }).then(res => res.json()).then(result => {
                    if (result.status === 200) {
                        setProductImages(result.data.product_images);
                        const oldImageIds = (result.data.product_images).map(img => img.id);
                        setGallery(oldImageIds);
                        setSelectedSizes(result.data.sizes.map(size => size.id));
                        reset({
                            title: result.data.title,
                            price: result.data.price,
                            compare_price: result.data.compare_price,
                            short_description: result.data.short_description,
                            qty: result.data.qty,
                            sku: result.data.sku,
                            barcode: result.data.barcode,
                            status: result.data.status,
                            is_featured: result.data.is_featured,
                        });
                        setDescription(result.data.description || '');
                    } else {
                        navigate('/admin/products');
                        toast.error(result.message, {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            pauseOnHover: true,
                            theme: 'colored'
                        })
                    }
                })
            } catch (error) {
                toast.error("Failed to fetch product data!", {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        }
    })
    const editProduct = async (data) => {
        const formData = { ...data, description, gallery }
        const res = await fetch(`${apiUrl}/admin/products/edit/${params.id}`, {
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
            } else {
                // navigate('/admin/products');
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
            return result.data
        }
        return [];
    }
    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data: brands = [], isLoading: loadingBrands } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands,
    });

    const { data: sizes = [], isLoading: loadingSizes } = useQuery({
        queryKey: ['sizes'],
        queryFn: fetchSizes
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
            setGallery(prev => [...prev, result.data.id]);
            setProductImages(prev => [...prev, result.data]);
            e.target.value = '';
        })
    }
    const deleteImage = (image) => {
        const newProductImages = productImages.filter(gallery => gallery.image_url != image);
        setProductImages(newProductImages);

        const deletedImage = productImages.find(img => img.image_url === image);
        if (deletedImage) {
            setGallery(prev => prev.filter(id => id !== deletedImage.id));
        }
    }
    const changeImage = async (image) => {
        const res = await fetch(`${apiUrl}/admin/change-product-default-image`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: params.id,
                image: image
            })
        }).then(res => res.json()).then(result => {
            if (result.status == 200 && result.type == 'default_image_update') {
                toast.success(result.message, {
                    position: 'top-right',
                    closeOnClick: true,
                    autoClose: 3000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored'
                });
            } else {
                toast.error(result.message, {
                    position: 'top-right',
                    closeOnClick: true,
                    autoClose: 3000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored'
                });
            }
        })
    }
    return (
        <Layout>
            <div className='container brand py-5'>
                <h3>Products / Edit</h3>
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
                                    <form action="" className='form' onSubmit={handleSubmit(editProduct)}>
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
                                                    tabIndex={1} // tabIndex of textarea
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
                                                        <label htmlFor="barcode" className='form-label'>Status</label>
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
                                                                        onChange={(e) => {
                                                                            const value = parseInt(e.target.value);
                                                                            if (e.target.checked) {
                                                                                setSelectedSizes([...selectedSizes, value]);
                                                                            } else {
                                                                                setSelectedSizes(selectedSizes.filter(id => id !== value));
                                                                            }
                                                                        }}
                                                                        type='checkbox' id={`size-${size.id}`} checked={selectedSizes.includes(size.id)} value={size.id} className={`form-check-input ms-1 ${errors.sizes && 'is-invalid'}`} />
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
                                                        productImages && productImages.map((productImage, index) => {
                                                            return (
                                                                <div className='col-xl-3' key={index}>
                                                                    <div className='card shadow p-2'>
                                                                        <img src={productImage.image_url} className='w-100 rounded mb-2' alt="" />
                                                                        <button className='btn btn-danger mb-2' onClick={() => deleteImage(productImage.image_url)}>Delete</button>
                                                                        <button type='button' className='btn btn-dark' onClick={() => changeImage(productImage.image)}>Set a Product Image</button>
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

export default EditProduct;