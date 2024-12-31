import { ChangeEventHandler, FormEvent, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  varient?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "VENDOR" | "USER";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  shop: IShop;
  rating: IRating;
  review: IReview;
  follow: IFollow[];
  createdAt: string;
  updatedAt: string;
}

export interface IShop {
  id: string;
  vendorId: string;
  name: string;
  logo: string;
  description: string;
  isBlackListed: boolean;
  createdAt: string;
  updatedAt: string;
  vendor: IVendor;
  product: IProduct[];
  shopResponse: IShopResponse[];
  follow: IFollow[];
  coupon: ICoupon[];
}

export interface IVendor {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  img: string;
  quantity: number;
  discount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  orderItem: IOrderItem[];
  rating: IRating[];
  review: IReview[];
  shop: IShop;
  flashSale: IFlashSale[];
}

export interface IShopResponse {
  id: string;
  reviewId: string;
  shopId: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFollow {
  userId: string;
  shopId: string;
}

export interface ICoupon {
  id: string;
  shopId: string;
  code: string;
  percentage: number;
  shop: IShop;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICoupon {
  id: string;
  shopId: string;
  code: string;
  percentage: number;
  shop: IShop;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFlashSale {
  id: string;
  productId: string;
  percentage: number;
  expiryDate: string;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  comment: string;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
  user: IUser;
  shopResponse: IShopResponse[];
}

export interface IShopResponse {
  id: string;
  reviewId: string;
  shopId: string;
  response: string;
  createdAt: string;
  updatedAt: string;
  review: IReview;
  shop: IShop;
}

export interface IRating {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  product: IProduct;
}

export interface ICategory {
  id: string;
  name: string;
  img: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  product: IProduct[];
}

export interface IOrder {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  paymentStatus: string;
  transactionId: any;
  createdAt: string;
  updatedAt: string;
  orderItem: IOrderItem[];
  payment: IPayment;
}

export interface IOrderItem {
  id: string;
  productId: string;
  product: IProduct[];
  orderId: string;
  order: IOrder;
  quantity: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  orderId: string;
  order: IOrder;
  amount: number;
  transactionId: string;
  gatewayData?: object;
  createdAt: string;
  updatedAt: string;
}
