import React from 'react'
import LogoWhite from "../../assets/images/logo-white.png";
const Footer = () => {
  return (
    <footer className="pt-5 pb-3">
        <div className="container">
          <div className="row text-white">
            <div className="col-lg-3 col-md-6">
              <img src={LogoWhite} alt="" width={150}/>
              <p className="pt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, soluta.</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h2>Categories</h2>
              <ul>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Mens</a></li>
                <li><a href="#">Women</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Register</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h2>get in touch</h2>
              <ul>
                <li>
                  <a href="#">+201152743894</a>
                </li>
                <li><a href="#">muhammedshaban101@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <hr />
          <div className='row spotlight my-5 text-white'>
              <div className="col-md-4">
                <div className="d-flex justify-content-center">
                  <h3>Free Delivery</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-center">
                  <h3>Money Back Guartntee</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-center">
                  <h3>Secure Payment</h3>
                </div>
              </div>
          </div>
          <hr />
          <div className="row mt-4">
            <div className="col-md-12">
              <p className="text-white d-flex justify-content-center">&copy;2024 All Right Reserved</p>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer