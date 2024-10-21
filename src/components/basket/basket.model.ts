import { EventEmitter } from '../base/events';

export interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
}

export class BasketModel implements IBasketModel {
	items: Map<string, number>;

	constructor(protected events: EventEmitter) {}

	add(id: string): void {}
	remove(id: string): void {}

	protected changed() {
		this.events.emit('cart:change', { items: Array.from(this.items.keys()) });
	}
}
