import { IProduct, IProducts } from '@/types';
import { IEvents } from '../base/events';

export interface IGalleryModel {
	products: IProducts;
	setProducts(items: IProducts): void;
	getProduct(id: string): IProduct | undefined;
}

export class GalleryModel implements IGalleryModel {
	products: IProducts;

	constructor(protected events: IEvents) {}

	setProducts(items: IProducts): void {
		this.products = items;
		this.events.emit('catalog:set', items);
	}
	getProduct(id: string): IProduct | undefined {
		return this.products.find((item) => item.id === id);
	}
}
