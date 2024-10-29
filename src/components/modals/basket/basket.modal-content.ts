import { IEvents } from '@/components/base/events';
import { IModalContent } from '@/components/modal';
import { ModalContentFactory } from '@/factories/modal.factory';
import { IProduct } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { IBasketModel } from './basket.model';
import { BasketItemView } from './components/basket-item';

export class BasketModalContent implements IModalContent {
	protected listContainer: HTMLUListElement;
	protected totalPriceElement: HTMLSpanElement;
	protected checkoutButton: HTMLButtonElement;

	protected items: IProduct[] = [];
	protected total: number = 0;

	private _isInit: boolean = false;

	constructor(
		protected events: IEvents,
		protected basketModel: IBasketModel,
		protected modalContentFactory: ModalContentFactory
	) {
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
				content: this.modalContentFactory.createModalContent('order', {
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
