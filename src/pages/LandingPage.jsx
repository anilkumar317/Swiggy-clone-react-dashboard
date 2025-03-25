import { useEffect, useState } from 'react';
import AddProduct from '../components/forms/AddProduct';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddFirm from '../components/forms/AddFirm';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogout(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem('vendorFirmName');

    if (firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const logoutHandler = () => {
    confirm('Are you sure you want to logout? ');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('vendorFirmId');
    localStorage.removeItem('vendorFirmName');
    setShowLogout(false);
    setShowFirmTitle(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };
  const showFirmHandler = () => {
    if (showLogout) {
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Pls login');
      setShowLogin(true);
    }
  };
  const showProductHandler = () => {
    if (showLogout) {
      setShowProduct(true);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Pls login');
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowAllProducts(true);
      setShowWelcome(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
    } else {
      alert('Pls Login');
      setShowLogin(true);
    }
  };

  return (
    <>
      <section className="landing-section">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="collection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
          {showLogin && (
            <Login
              showWelcomeHandler={showWelcomeHandler}
              showAllProductsHandler={showAllProductsHandler}
            />
          )}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogout && <AddFirm />}
          {showProduct && showLogout && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && (
            <AllProducts showAllProductsHandler={showAllProductsHandler} />
          )}
        </div>
      </section>
    </>
  );
}

export default LandingPage;
