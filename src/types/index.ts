export const KEY = "access-token";

export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IWatch {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
  status: "Available" | "Unavailable";
}

export interface ICartItem {
  id: string;
  quantity: number;
  watchId: string;
  userId: string;
}

// admin part

export interface AdminWatch {
  id: string;
  title: string;
  image: string;
  price: number;
  status: string;
  rating: number;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface IBlog {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}
