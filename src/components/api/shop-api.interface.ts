import type {
	IOrder,
	IOrderResponse,
	IProduct,
	IProductsResponse,
} from '@/types';
import type { Api } from '../base/api';

export interface IShopApi extends Api {
	getProducts(): Promise<IProductsResponse>;
	getProduct(id: string): Promise<IProduct>;
	createOrder(order: IOrder): Promise<IOrderResponse>;
}
