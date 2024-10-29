import type { IEvents } from '@/components/base/events';
import type { IProduct, IView } from '@/types';
import { ensureElement } from '@/utils/utils';

export interface IBasketItemData {
	product: IProduct;
	index: number;
}

export class BasketItemView implements IView {
	protected index: HTMLSpanElement;
	protected title: HTMLSpanElement;
	protected price: HTMLSpanElement;
	protected deleteButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents
	) {
		this.title = ensureElement<HTMLSpanElement>('.card__title', this.container);
		this.deleteButton = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			this.container
		);
		this.price = ensureElement<HTMLSpanElement>('.card__price', this.container);
		this.index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			this.container
		);

		this.deleteButton.addEventListener('click', () => {
			this.events.emit('basket:remove', { id: this.id });
		});
	}

	render(data: { product: IProduct; index: number }): HTMLElement {
		if (data) {
			this.id = data.product.id;
			this.title.textContent = data.product.title;
			this.price.textContent = data.product.price
				? data.product.price.toString() + ' синапсов'
				: 'бесценно';
			this.index.textContent = data.index.toString();
		}

		return this.container;
	}
}
