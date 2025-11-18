import React, { useEffect, useState } from "react";
import ProductImg from '../../assets/images/eight.jpg';
import { Link } from "react-router-dom";
import { apiUrl } from "./Http";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
const LatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const fetchLatestProducts = async () => {
    const res = await fetch(`${apiUrl}/get-latest-products`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const result = await res.json();
    if (result.status == 200) {
      setLatestProducts(result.data);
      return result.data;
    }
    return [];
  }
  const { data: fetchLatest = [], isloading: loadingLatest } = useQuery({
    queryKey: ['latest'],
    queryFn: fetchLatestProducts
  });
  return (
    <div className="section-2 py-5">
      <div className="container">
        <h2>New Arrivals</h2>
        {
          loadingLatest ? <Loader /> : <div className="row mt-4">
            {
              latestProducts && latestProducts.map((product, index) => {
                return (
                  <div className="col-lg-3 col-md-4 mb-4" key={index}>
                    <div className="product card border-0 shadow rounded-3 overflow-hidden">
                      <div className="card-img">
                        <Link to={`/product/${product.id}`}><img src={product.image_url} alt="" className="w-100" /></Link>
                      </div>
                      <div className="card-info pt-3 p-3">
                        <Link to={'/product'}>{product.title}</Link>
                        <div className="price">
                          $
                          {
                            product.price
                          }
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
              })
            }
          </div>
        }
      </div>
    </div>
  );
};

export default LatestProducts;
