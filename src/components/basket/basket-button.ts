import { IView } from '../../types';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ShopApi } from '../shop-api';
import { BasketModalContent } from './basket-modal-content';
import { BasketModel, IBasketModel } from './basket.model';

export class BasketButton implements IView {
	protected basket: IBasketModel = BasketModel.Instance;

	protected counter: HTMLSpanElement;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		protected basketContent: BasketModalContent,
		protected api: ShopApi
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
			this.counter.textContent = this.basket.getCount().toString();
		});
	}

	render(data?: object): HTMLElement {
		this.counter.textContent = this.basket.toString();

		return this.container;
	}
}
