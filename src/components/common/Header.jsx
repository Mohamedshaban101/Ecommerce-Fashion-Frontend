import React, { useContext } from 'react'
import { Container , Navbar , Nav } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import { AdminAuthContext } from '../context/AdminAuth';
import Loader from './Loader';
const Header = () => {
  const { cart , loadingCart} = useContext(CartContext);
  const { user , loadingUser } = useContext(AdminAuthContext);
  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <span className="text-white">your fashion partner</span>
      </div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>
            <img src={Logo} alt="" width={140} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-link">
                Mens
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Women
              </Nav.Link>
              <Nav.Link href="#link" className="nav-link">
                Kids
              </Nav.Link>
              {
                loadingUser ? <Loader /> : !user && <Link to={'/register'} className="nav-link text-danger">Sign Up</Link>
              }
            </Nav>
            <div className="nav-right d-flex">
              <Link to={'/account'} className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                </svg>
              </Link>
              {
                loadingCart ? <Loader /> : <Link to={'/cart'} className="ms-3 position-relative">
                <span className='position-absolute transform-middle bg-danger rounded w-1 d-flex justify-content-center align-items-center text-white' style={{ width: '20px', height: '20px', bottom: '44%', left: '60%' }}>{cart.totalItem ? cart.totalItem : 0}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="28"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                </svg>
              </Link>
              }
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header