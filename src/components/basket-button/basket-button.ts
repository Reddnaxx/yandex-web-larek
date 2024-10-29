import type { IView } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import type { IShopApi } from '../api/shop-api.interface';
import type { IEvents } from '../base/events';
import type { BasketModalContent, IBasketModel } from '../modals/basket';

export class BasketButton implements IView {
	protected counter: HTMLSpanElement;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		protected basketContent: BasketModalContent,
		protected basketModel: IBasketModel,
		protected api: IShopApi
	) {
		this.counter = ensureElement('.header__basket-counter', this.container);

		this.initEvents();
	}

	initEvents(): void {
		this.container.onclick = () => {
			const basketTemplate = cloneTemplate('#basket');

			this.events.emit('modal:open', {
				container: basketTemplate,
				content: this.basketContent,
			});
		};

		this.events.on('basket:change', () => {
			this.updateCounter();
		});
	}

	render(): HTMLElement {
		this.updateCounter();

		return this.container;
	}

	updateCounter(): void {
		this.counter.textContent = this.basketModel.getCount().toString();
	}
}
