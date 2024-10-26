import { IEvents } from '@/components/base/events';
import { IModalContent } from '@/components/modal';
import { IProduct } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { OrderModalContent } from '../order/order.modal-content';
import { BasketModel, IBasketModel } from './basket.model';
import { BasketItemView } from './components/basket-item';

export class BasketModalContent implements IModalContent {
	protected basketModel: IBasketModel = BasketModel.Instance;

	protected listContainer: HTMLUListElement;
	protected totalPriceElement: HTMLSpanElement;
	protected checkoutButton: HTMLButtonElement;

	protected items: IProduct[] = [];
	protected total: number = 0;

	private _isInit: boolean = false;

	constructor(protected events: IEvents) {
		this.initEvents();
	}

	getElements(container: HTMLElement): void {
		this._isInit = true;

		this.listContainer = ensureElement<HTMLUListElement>(
			'.basket__list',
			container
		);
		this.totalPriceElement = ensureElement<HTMLSpanElement>(
			'.basket__price',
			container
		);
		this.checkoutButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);
	}

	setElements(): void {
		if (!this._isInit) return;

		this.items = this.basketModel.getItems();
		this.checkoutButton.disabled = this.items.length === 0;
		this.listContainer.replaceChildren(
			...this.items.map((product, index) =>
				new BasketItemView(cloneTemplate('#card-basket'), this.events).render({
					product,
					index: index + 1,
				})
			)
		);

		this.total = this.items.reduce((acc, item) => acc + item.price, 0);
		this.totalPriceElement.textContent = this.total.toString() + ' синапсов';

		this.checkoutButton.onclick = () => {
			this.events.emit('modal:open', {
				container: cloneTemplate('#order'),
				content: new OrderModalContent(this.events, {
					payment: 'online',
					email: '',
					phone: '',
					address: '',
					total: this.total,
					items: this.items.map((item) => item.id),
				}),
			});
		};
	}

	protected initEvents(): void {
		this.events.on('basket:change', () => {
			this.setElements();
		});
	}
}
