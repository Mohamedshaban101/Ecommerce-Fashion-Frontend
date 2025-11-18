import React, { useEffect, useState } from 'react'
import { apiUrl } from './Http';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    const res = await fetch(`${apiUrl}/get-featured-products`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const result = await res.json();
    if (result.status == 200) {
      setFeaturedProducts(result.data);
      return result.data;
    }
    return [];
  }
  const { data: fetchFeatured = [], isloading: loadingFeatured } = useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeaturedProducts
  });
  return (
    <div className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>
        {
          loadingFeatured ? <Loader /> : <div className="row mt-4">
            {
              featuredProducts && featuredProducts.map((product, index) => {
                return (
                  <div className="col-lg-3 col-md-4 mb-4" key={index}>
                    <div className="product card border-0 shadow rounded-3 overflow-hidden">
                      <div className="card-img">
                        <img src={product.image_url} alt="" className="w-100" />
                      </div>
                      <div className="card-info pt-3 p-3">
                        <a href="">{product.title}</a>
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
  )
}

export default FeaturedProducts