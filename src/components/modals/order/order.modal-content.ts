import type { IEvents } from '@/components/base/events';
import type { IModalContent } from '@/components/modal';
import type { ModalContentFactory } from '@/factories/modal.factory';
import type { IOrder, PaymentMethod } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';

export class OrderModalContent implements IModalContent {
	protected form: HTMLFormElement;
	protected onlineButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected nextButton: HTMLButtonElement;
	protected errors: HTMLSpanElement;

	protected isValid = false;
	protected payment: PaymentMethod | null = null;

	constructor(
		protected events: IEvents,
		protected order: IOrder,
		protected modalContentFactory: ModalContentFactory
	) {}

	getElements(container: HTMLElement): void {
		this.form = ensureElement<HTMLFormElement>('form', container);
		this.errors = ensureElement<HTMLSpanElement>('.form__errors', container);
		this.onlineButton = ensureElement<HTMLButtonElement>(
			'[name="card"]',
			container
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'[name="cash"]',
			container
		);
		this.addressInput = ensureElement<HTMLInputElement>(
			'[name="address"]',
			container
		);
		this.nextButton = ensureElement<HTMLButtonElement>(
			'.order__button',
			container
		);
	}

	setElements(): void {
		this.addressInput.oninput = () => {
			this.updateValidity();
		};

		this.onlineButton.onclick = () => {
			this.payment = 'online';
			this.onlineButton.classList.add('button_alt-active');
			this.cashButton.classList.remove('button_alt-active');
			this.updateValidity();
		};
		this.cashButton.onclick = () => {
			this.payment = 'cash';
			this.cashButton.classList.add('button_alt-active');
			this.onlineButton.classList.remove('button_alt-active');
			this.updateValidity();
		};

		this.form.onsubmit = (e: SubmitEvent) => {
			e.preventDefault();
			this.events.emit('modal:open', {
				container: cloneTemplate('#contacts'),
				content: this.modalContentFactory.createModalContent('contacts', {
					...this.order,
					payment: this.payment,
					address: this.addressInput.value,
				}),
			});
		};
	}

	protected updateValidity(): void {
		const isAddressValid = this.addressInput.value.length > 0;
		const isPaymentValid = this.payment !== null;

		const result = isAddressValid && isPaymentValid;
		this.nextButton.disabled = !result;

		if (!isPaymentValid) {
			this.errors.textContent = 'Выберите способ оплаты';
		} else if (!isAddressValid) {
			this.errors.textContent = 'Заполните адрес';
		} else {
			this.errors.textContent = '';
		}

		this.isValid = result;
	}
}
