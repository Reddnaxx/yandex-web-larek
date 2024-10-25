import { cloneTemplate, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { IModalContent } from '../modal';
import { BasketItemView } from './basket-item';
import { BasketModel } from './basket.model';

export class BasketModalContent implements IModalContent {
	protected listContainer: HTMLUListElement;
	protected totalPrice: HTMLSpanElement;
	protected checkoutButton: HTMLButtonElement;

	constructor(protected events: IEvents, protected basketModel: BasketModel) {
		this.initEvents();
	}

	getElements(container: HTMLElement): void {
		this.listContainer = ensureElement<HTMLUListElement>(
			'.basket__list',
			container
		);
		this.totalPrice = ensureElement<HTMLSpanElement>(
			'.basket__price',
			container
		);
	}

	setElements(): void {
		const items = this.basketModel.getItems();
		this.listContainer?.replaceChildren(
			...items.map((product, index) =>
				new BasketItemView(cloneTemplate('#card-basket'), this.events).render({
					product,
					index: index + 1,
				})
			)
		);

		if (this.totalPrice) {
			this.totalPrice.textContent =
				items.reduce((acc, item) => acc + item.price, 0).toString() +
				' синапсов';
		}
	}

	protected initEvents(): void {
		this.events.on('basket:change', () => {
			this.setElements();
		});
	}
}
