export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface PaymentMethod {
  type: 'paypal' | 'mpesa';
  details: {
    [key: string]: string;
  };
}