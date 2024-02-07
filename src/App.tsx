import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import products from "./products";
import { Product } from "../types/product";
import ProductCard from "./components/ProductCard";
import { Provider } from "react-redux";
import store from "./store";

function App() {

  const allCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = products.filter((product) =>
    selectedCategories.length === 0 ? true : selectedCategories.includes(product.category)
  );

  const [sortByDropdownVisible, setSortByDropdownVisible] = useState(false);


  const sortingOptions = [
    "price ascending",
    "price descending"
  ]

  const [sortingOption, setSortingOption] = useState(sortingOptions[0]);
  
  const handleSortingOption = (index: number) => {
    setSortingOption(sortingOptions[index])
    setSortByDropdownVisible(false);
  }



  if (sortingOption === "price ascending") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortingOption === "price descending") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Provider store={store}>
    <div className="app">
      <div className="container">
        <Nav />

        <div className="row">
          <div className="col">
            <div className="product-list-utility d-flex justify-content-between align-items-center">
              <h4>Photography / <span className="text-light-gray fw-light">Premium Photos</span></h4>
              <div className="sort-by-trigger position-relative d-flex align-items-center gap-2"           
                onMouseEnter={() => setSortByDropdownVisible(true)}
                onMouseLeave={() => setSortByDropdownVisible(false)}
              >
                <div className="d-flex align-items-center gap-1 text-muted">
                  <img src="/sort.svg" width={15} height={15} alt="" />
                  <span>Sort By</span>
                </div>
                <span className="text-capitalize">{sortingOption}</span>
                <img src="/chevron-down.svg" width={16} height={8} alt="" />
                {sortByDropdownVisible && (
                  <div className="sort-by-dropdown position-absolute shadow w-100 p-3 d-flex flex-column gap-2">
                    {sortingOptions.map((option, index) => (
                      <span className="d-block text-capitalize" key={index} onClick={() => handleSortingOption(index)}>{option}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row products-content mt-5 mb-5">
          <div className="col-lg-3">
            <h5 className="mb-4">Category</h5>
            <div className="category-list">
            {allCategories.map((category) => (
              <div
                key={category}
                className="form-check checkbox-wrapper d-flex align-items-center mb-3"
              >
                <label className="d-flex">
                  <input
                    type="checkbox"
                    id={category}
                    className="form-check-input opacity-0"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    aria-hidden={true}
                  />
                  <span
                    className={`custom-checkbox ${
                      selectedCategories.includes(category)
                        ? "custom-checkbox--active"
                        : ""
                    }`}
                  >
                    {selectedCategories.includes(category) && (
                      <img src="/check.svg" alt="" />
                    )}
                  </span>
                  <span className="form-check-label text-capitalize">
                    {category}
                  </span>
                </label>
              </div>
            ))}
            </div>

            <h5 className="mb-4">Price range</h5>
            <div>

            </div>
          </div>
          <div className="col-lg-9">
            <div className="row row-cols-1 row-cols-lg-3 g-4 g-xl-5">
            {filteredProducts.map((product: Product, index: number) => (
              <ProductCard product={product} key={index} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;
