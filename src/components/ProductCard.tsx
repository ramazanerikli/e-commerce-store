import React, { FC, useState } from "react";
import { Product } from "../../types/product";
import { useDispatch } from 'react-redux';

const ProductCard: FC<{
  product: Product;
}> = ({ product }) => {
  const dispatch = useDispatch();

  const [focusedProduct, setFocusedProduct] = useState(-1);

  const focusProduct = (id: number) => {
    setFocusedProduct(id)
  }

  const leaveProduct = () => {
    setFocusedProduct(-1)
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'OPEN_CART_DROPDOWN' });
  };


  return (
    <div className="col">
      <div className="product-card">
        <div className="product-card-inner position-relative"           
          onMouseEnter={() => focusProduct(Number(product.id))}
          onMouseLeave={() => leaveProduct()}>
          {product.bestseller && ( <span className="bg-white text-dark position-absolute px-3">Best Seller</span> )}
          <img src={product.image} className="w-100" width={280} height={398} alt={product.name} />
          <button onClick={handleAddToCart} className={focusedProduct === Number(product.id) ? "btn btn-dark border-0 rounded-0 w-100 position-absolute add-to-cart-btn opacity-1" : "btn btn-dark border-0 rounded-0 w-100 position-absolute add-to-cart-btn opacity-0"}>ADD TO CART</button>
        </div>
        <p className="text-capitalize mb-0 text-muted fw-bold">{product.category}</p>
        <h3 className="fw-bold mb-0">{product.name}</h3>
        <h5 className="text-muted mb-0">${product.price}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
