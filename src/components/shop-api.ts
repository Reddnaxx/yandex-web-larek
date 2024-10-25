import { IProduct, IProducts } from '../types';
import { API_URL, CDN_URL } from '../utils/constants';
import { Api } from './base/api';

export interface IProductResponse {
	items: IProducts;
	total: number;
}

export class ShopApi extends Api {
	constructor() {
		super(API_URL);
	}

	getProducts(): Promise<IProducts> {
		return this.get('/product') as Promise<IProducts>;
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`) as Promise<IProduct>;
	}

	static getImageUrl(path: string): string {
		return `${CDN_URL}${path}`;
	}
}
