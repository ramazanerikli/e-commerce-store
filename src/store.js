import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [],
  cartDropdownOpen: false,
  cart: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, category],
        };
      }
      case 'OPEN_CART_DROPDOWN':
        return {
          ...state,
          cartDropdownOpen: true,
        };
        case 'CLOSE_CART_DROPDOWN':
          return {
            ...state,
            cartDropdownOpen: false,
          };
          case 'ADD_TO_CART':
            const productToAdd = action.payload;
            const existingProductIndex = state.cart.findIndex((p) => p.id === productToAdd.id);
          
            if (existingProductIndex !== -1) {
              const updatedCart = [...state.cart];
              updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + 1,
              };
          
              return {
                ...state,
                cart: updatedCart,
              };
            } else {
              return {
                ...state,
                cart: [...state.cart, { ...productToAdd, quantity: 1 }],
              };
            }
          case 'CLEAR_CART':
            return {
              ...state,
              cart: [],
            };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
