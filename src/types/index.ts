import { IEvents } from '../components/base/events';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price?: number;
	category: string;
}

export interface IProducts extends Array<IProduct> {}

export interface IOrder {
	id: string;
	total: number;
}

export interface IOrders extends Array<IOrder> {}

export interface IViewConstructor {
	new (container: HTMLElement, events: IEvents): IView;
}

export interface IView {
	render(data?: object): HTMLElement;
}
