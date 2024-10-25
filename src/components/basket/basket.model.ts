import { IProduct } from '../../types';
import { IEvents } from '../base/events';
import { ShopApi } from '../shop-api';

export interface IBasketModel {
	addItem(id: string): void;
	removeItem(id: string): void;
	getItems(): IProduct[];
	getCount(): number;
	hasItem(id: string): boolean;
}
export class BasketModel implements IBasketModel {
	static Instance: IBasketModel;

	protected items: IProduct[] = [];

	constructor(protected events: IEvents, protected api: ShopApi) {
		BasketModel.Instance ??= this;

		this.initEvents();
	}

	addItem(id: string): void {
		this.api.getProduct(id).then((product) => {
			this.items.push(product);
			this.events.emit('basket:change', this.items);
		});
	}

	removeItem(id: string): void {
		this.items = this.items.filter((item) => item.id !== id);
		this.events.emit('basket:change', this.items);
	}

	getItems(): IProduct[] {
		return this.items;
	}

	getCount(): number {
		return this.items.length;
	}

	hasItem(id: string): boolean {
		return this.items.some((item) => item.id === id);
	}

	protected initEvents(): void {
		this.events.on('basket:add', (data: { id: string }) => {
			this.addItem(data.id);
		});

		this.events.on('basket:remove', (data: { id: string }) => {
			this.removeItem(data.id);
		});
	}
}
