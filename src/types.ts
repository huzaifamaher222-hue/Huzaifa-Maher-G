export interface Order {
  id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  location: string;
  likes: number;
  avatarColor: string;
  reply?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Product' | 'Shipping' | 'Guarantee';
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Feature {
  id: string;
  title: string;
  value: string;
}
