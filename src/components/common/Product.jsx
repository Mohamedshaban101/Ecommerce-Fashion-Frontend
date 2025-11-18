import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation, Autoplay } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { apiUrl } from "./Http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { CartContext } from "../context/Cart";
const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(3);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productSize, setProductSize] = useState(null);
  const [errors, setErrors] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLatestProduct = async () => {
    const res = await fetch(`${apiUrl}/get-latest-product/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const result = await res.json();
    if (result.status == 200) {
      setProduct(result.data);
      setProductImages(result.data.product_images);
      setSizes(result.data.sizes);
      return result.data;
    } else {
      toast.info(result.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        closeOnClick: true
      });
      navigate('/shop');
    }
  }
  const { data: fetchProduct = [], isLoading: loadingProduct } = useQuery({
    queryKey: ['product'],
    queryFn: fetchLatestProduct
  });

  const addToCart = async () => {
    const res = await fetch(`${apiUrl}/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
        size: productSize
      })
    });

    const result = await res.json();

    if (result.status === 200) {
      queryClient.invalidateQueries(['cart']);
      toast.success(result.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
        
      })
    }else if(result.status === 422){
      setErrors(result.error);
    }else{
      setErrors({ general: [result.message || "حدث خطأ غير متوقع"] });
    }

  }
  return (
    <>
      <Layout>
        {
          loadingProduct ? <Loader /> : <div className="container product-detail">
            <div className="row">
              <div className="col-xl-12">
                <nav aria-label="breadcrumb" className="py-4">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={"/shop"}>Shop</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Formal Dress For Lady
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-xl-5">
                <div className="row">
                  <div className="col-md-3 Product-left">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#000",
                        "--swiper-pagination-color": "#000",
                      }}
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      direction={`vertical`}
                      spaceBetween={10}
                      slidesPerView={6}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper mt-2"
                    >
                      {
                        productImages && productImages.map((productImage, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <div className="content">
                                <img
                                  src={productImage.image_url}
                                  alt=""
                                  height={100}
                                  className="w-100"
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })
                      }
                    </Swiper>
                  </div>
                  <div className="col-md-9">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#000",
                        "--swiper-pagination-color": "#000",
                      }}
                      loop={true}
                      spaceBetween={0}
                      navigation={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                      modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                      className="mySwiper2"
                    >
                      {
                        productImages && productImages.map((productImage, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <div className="content">
                                <img
                                  src={productImage.image_url}
                                  alt=""
                                  className="w-100"
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })
                      }
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="col-xl-7">
                <h3>{product.title}</h3>
                <div className="d-flex align-items-center  gap-2">
                  <Rating readonly initialValue={rating} size={20} />
                  <span className="pt-1 ps-2">10 Views</span>
                </div>
                <div className="price mt-3">
                  ${product.price}
                  {
                    product.compare_price && <span className="text-decoration-line-through text-secondary">
                      ${product.compare_price}
                    </span>
                  }
                </div>
                <div className="mb-3">
                  {
                    product.description
                  }
                </div>
                <div className="mb-4">
                  <strong className="mb-3">Select Size</strong>
                  <div className="sizes d-flex gap-2">
                    {
                      sizes && sizes.map((size, index) => {
                        return (
                          <button className={`btn btn-size ${productSize == size.id ? 'active' : ''}`} key={index} onClick={() => setProductSize(size.id)}>{size.name}</button>
                        );
                      })
                    }
                  </div>
                  {
                    errors.size && <p className='text-danger'>{errors.size[0]}</p>
                  }
                </div>
                <div className="add-to-cart">
                  <button className="btn btn-primary text-uppercase" onClick={addToCart}>
                    Add To Cart
                  </button>
                </div>
                <hr />
                <div>
                  <strong>SKU : </strong>
                  {
                    product.sku
                  }
                </div>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-xl-12">
                <Tabs
                  defaultActiveKey="profile"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="description" title="Description">
                    100% Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Animi temporibus culpa cum dolore? Sint, aperiam.
                  </Tab>
                  <Tab eventKey="profile" title="Reviews(50)">
                    Tab content for Profile
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        }
      </Layout>
    </>
  );
};

export default Product;
