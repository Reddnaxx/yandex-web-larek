import { IEvents } from '@/components/base/events';
import { IModalContent } from '@/components/modal';
import { IOrderResponse } from '@/types';
import { ensureElement } from '@/utils/utils';

export class SuccessModalContent implements IModalContent {
	protected description: HTMLElement;
	protected closeButton: HTMLButtonElement;
	constructor(protected events: IEvents, protected order: IOrderResponse) {}

	getElements(container: HTMLElement): void {
		this.description = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
	}

	setElements(): void {
		this.description.textContent = `Списано ${this.order.total} синапсов`;

		this.closeButton.onclick = () => {
			this.events.emit('modal:close');
		};
	}
}
