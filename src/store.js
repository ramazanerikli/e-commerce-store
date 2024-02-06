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
          return {
            ...state,
            cart: [...state.cart, productToAdd],
          };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
