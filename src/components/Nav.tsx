import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Product } from "../../types/product";

export interface RootState {
  selectedCategories: string[];
  cartDropdownOpen: boolean;
  cart: BasketProduct[];
}

export interface BasketProduct {
  id: string,
  name: string,
  category: string,
  price: number,
  currency: string,
  image: string,
  bestseller?: boolean,
  featured?: boolean,
  details?: null,
  quantity?: number
}

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const cartDropdownOpen = useSelector((state: RootState) => state.cartDropdownOpen);
  const cartItems = useSelector((state: RootState) => state.cart);

  console.log(cartItems)

  const handleOpenCartDropdown = () => {
    if (!cartDropdownOpen) {
      dispatch({ type: 'OPEN_CART_DROPDOWN' });
    } else if (cartDropdownOpen) {
      dispatch({ type: 'CLOSE_CART_DROPDOWN' })
    }
  };

  const handleCloseCartDropdown = () => {
      dispatch({ type: 'CLOSE_CART_DROPDOWN' });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <nav>
      <div className="navbar-inner d-flex align-items-center justify-content-between">
        <a className="navbar-brand" href="/">
          <img src={"/logo.png"} width={159} height={25} alt="Logo" />
        </a>
        <div className="cart-state position-relative">
          <button onClick={handleOpenCartDropdown} className="bg-transparent border-0">
          <AiOutlineShoppingCart size={54} />
          <span className="cart-badge bg-black text-white position-absolute d-flex align-items-center justify-content-center">
            {cartItems.length}
          </span>
          </button>
          {cartDropdownOpen && (
            <div className="position-absolute cart-dropdown d-flex flex-column">
              <div className="cart-dropdown-head d-flex justify-content-end">
                <span role="button" onClick={handleCloseCartDropdown}>
                  <img src="/close.svg" width={18} height={18} alt="" />
                </span>
                </div>
              <div className="cart-dropdown-content">
              {cartItems.length === 0 ? (
                <p className="text-muted text-start">
                No products.
                </p>
              ) : (
                <>
                  {cartItems.map((product: BasketProduct) => (
                    <div key={product.id} className="cart-item d-flex align-items-center justify-content-between">
                      <div className="d-flex flex-column">
                      <h5 className="fw-bold">
                        {product.name}
                      </h5>
                      <h6 className="text-muted fw-bold">${product.price}</h6>
                      </div>
                      <img src={product.image} className="product-img" alt="" width={149} height={86} />
                    </div>
                  ))}
                </>
              )}
              </div>
              <button className="btn btn-outline-dark rounded-0 clear-btn fw-semibold" onClick={handleClearCart}>CLEAR</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
