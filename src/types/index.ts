
export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price?: number;
	category: string;
}

export interface IProducts extends Array<IProduct> {}

export interface IProductsResponse {
	items: IProduct[];
	total: number;
}

export interface IOrderResponse {
	id: string;
	total: number;
}

export type PaymentType = 'online' | 'cash';

export interface IOrder {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrders extends Array<IOrder> {}

export interface IView {
	render(data?: object): HTMLElement;
}
