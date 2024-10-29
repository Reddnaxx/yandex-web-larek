export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price?: number;
	category: string;
}

export type IProducts = Array<IProduct>;

export interface IProductsResponse {
	items: IProduct[];
	total: number;
}

export interface IOrderResponse {
	id: string;
	total: number;
}

export type PaymentMethod = 'online' | 'cash';

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export type IOrders = Array<IOrder>;

export interface IView {
	render(data?: object): HTMLElement;
}
