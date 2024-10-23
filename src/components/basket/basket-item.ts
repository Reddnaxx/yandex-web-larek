import { IProduct, IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class BasketItemView implements IView {
	protected title: HTMLSpanElement;
	protected addButton: HTMLButtonElement;
	protected removeButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		this.title = ensureElement<HTMLSpanElement>(
			'.basket-item__title',
			this.container
		);
		this.addButton = ensureElement<HTMLButtonElement>(
			'.basket-item__add',
			this.container
		);
		this.removeButton = ensureElement<HTMLButtonElement>(
			'.basket-item__remove',
			this.container
		);

		this.addButton.addEventListener('click', () => {
			this.events.emit('ui:basket-add', { id: this.id });
		});

		this.removeButton.addEventListener('click', () => {
			this.events.emit('ui:basket-remove', { id: this.id });
		});
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.id = data.id;
			this.title.textContent = data.title;
		}

		return this.container;
	}
}
