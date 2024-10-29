import type {
	IOrder,
	IOrderResponse,
	IProduct,
	IProductsResponse,
} from '@/types';
import { API_URL, CDN_URL } from '@/utils/constants';
import { Api } from '../base/api';
import type { IShopApi } from './shop-api.interface';

export class ShopApi extends Api implements IShopApi {
	constructor() {
		super(API_URL);
	}

	getProducts(): Promise<IProductsResponse> {
		return this.get('/product') as Promise<IProductsResponse>;
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`) as Promise<IProduct>;
	}

	createOrder(order: IOrder): Promise<IOrderResponse> {
		return this.post('/order', order) as Promise<IOrderResponse>;
	}

	static getImageUrl(path: string): string {
		return `${CDN_URL}${path}`;
	}
}
