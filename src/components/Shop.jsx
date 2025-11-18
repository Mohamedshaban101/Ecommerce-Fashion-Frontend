import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import Hero from "./common/Hero";
import ProductImg from "../assets/images/eight.jpg";
import { Link } from "react-router-dom";
import { apiUrl } from "./common/Http";
import { useQuery } from "@tanstack/react-query";
import Loader from "./common/Loader";
const Shop = () => {
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [brandChecked, setBrandChecked] = useState([]);

  const fetchProducts = async () => {
    let params = new URLSearchParams();
    if (categoryChecked.length > 0) {
      categoryChecked.forEach(cat => {
        params.append('category[]', cat);
      });
    }
    if(brandChecked.length > 0){
      brandChecked.forEach((brand) => {
        params.append('brand[]' , brand);
      })
    }
    const res = await fetch(`${apiUrl}/get-products?${params}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await res.json();
    if (result.status == 200) {
      return result.data;
    }
    return [];
  }
  const { data: products = [], isLoading: loadingProducts  , refetch} = useQuery({
    queryKey: ['products' , categoryChecked , brandChecked],
    queryFn: fetchProducts
  });
  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/get-categories`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await res.json();
    if (result.status == 200) {
      return result.data;
    }
    return [];
  }
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/get-brands`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await res.json();
    if (result.status == 200) {
      return result.data;
    }
    return [];
  }
  const { data: brands = [], isLoading: loadingBrands} = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands
  });


  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCategoryChecked((prev) => [...prev, value]);
    } else {
      setCategoryChecked(categoryChecked.filter(id => id != value));
    }
  }

  const handleBrand = (e) => {
    const {checked , value} = e.target;
    if(checked){
      setBrandChecked((prev) => [...prev , value]);
    }else{
      setBrandChecked(brandChecked.filter(id => id != value));
    }
  }
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-4">
            <div className="card shadow border-0">
              <div className="card-info p-4">
                <h3 className="mb-3">Category</h3>
                <ul className="d-flex flex-column gap-1">
                  {
                    loadingCategories ? <Loader /> :
                      categories && categories.map((category, index) => {
                        return (
                          <li key={index}>
                            <input type="checkbox" name="" id={`category-${category.id}`} value={category.id} onClick={handleCategory} />{" "}
                            <label htmlFor={`category-${category.id}`} className="ms-1">
                              {category.name}
                            </label>
                          </li>
                        );
                      })
                  }
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 my-4">
              <div className="card-info p-4">
                <h3 className="mb-3">Brands</h3>
                <ul className="d-flex flex-column gap-1">
                  {
                    loadingBrands ? <Loader /> :
                      brands && brands.map((brand, index) => {
                        return (
                          <li key={index}>
                            <input type="checkbox" name="" id={`brand-${brand.id}`} value={brand.id} onClick={handleBrand}/>{" "}
                            <label htmlFor={`brand-${brand.id}`} className="ms-1">
                              {brand.name}
                            </label>
                          </li>
                        );
                      })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              {
                loadingProducts ? <Loader /> :
                  products.length > 0 ? products.map((product, index) => {
                    return (
                      <div className="col-lg-4 mb-4" key={index}>
                        <div className="product card border-0 shadow rounded-3 overflow-hidden">
                          <div className="card-img">
                            <Link to={`/product/${product.id}`}><img src={product.image_url} alt="" className="w-100" /></Link>
                          </div>
                          <div className="card-info pt-3 p-3">
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                            <div className="price">
                              ${product.price}
                              {
                                product.compare_price && <span className="text-decoration-line-through text-secondary">
                                  ${product.compare_price}
                                </span>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }) : <div className="d-flex align-items-center justify-content-center text-danger">No Data found</div>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
