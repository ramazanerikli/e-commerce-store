export interface Product {
  id: string,
  name: string,
  category: string,
  price: number,
  currency: string,
  image: string,
  bestseller?: boolean,
  featured?: boolean,
  details?: null
}