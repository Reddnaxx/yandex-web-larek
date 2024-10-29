import { ShopApi } from '@/components/shop-api';
import { ModalContentFactory } from '@/factories/modal.factory';
import { IOrder } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { IEvents } from '../../base/events';
import { IModalContent } from '../../modal';

export class ContactsModalContent implements IModalContent {
	protected form: HTMLFormElement;
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected submitButton: HTMLButtonElement;
	protected errors: HTMLSpanElement;

	protected isValid: boolean = false;

	constructor(
		protected events: IEvents,
		protected order: IOrder,
		protected api: ShopApi,
		protected modalContentFactory: ModalContentFactory
	) {}

	getElements(container: HTMLElement): void {
		this.form = ensureElement<HTMLFormElement>('form', container);
		this.errors = ensureElement<HTMLSpanElement>('.form__errors', container);
		this.emailInput = ensureElement<HTMLInputElement>(
			'[name="email"]',
			container
		);
		this.phoneInput = ensureElement<HTMLInputElement>(
			'[name="phone"]',
			container
		);
		this.submitButton = ensureElement<HTMLButtonElement>(
			'[type="submit"]',
			container
		);
	}

	setElements(): void {
		this.form.onsubmit = (e: SubmitEvent) => {
			e.preventDefault();

			this.order = {
				...this.order,
				email: this.emailInput.value,
				phone: this.phoneInput.value,
			};

			this.api.createOrder(this.order).then((data) => {
				this.events.emit('basket:clear');
				this.events.emit('modal:open', {
					container: cloneTemplate('#success'),
					content: this.modalContentFactory.createModalContent('success', data),
				});
			});
		};

		this.emailInput.oninput = () => this.updateValidity();
		this.phoneInput.oninput = () => this.updateValidity();
	}

	protected updateValidity(): void {
		const isEmailValid = !!this.emailInput.value;
		const isPhoneValid = !!this.phoneInput.value;

		this.isValid = isEmailValid && isPhoneValid;

		if (!isEmailValid) {
			this.errors.textContent = 'Введите Email';
		} else if (!isPhoneValid) {
			this.errors.textContent = 'Введите телефон';
		} else {
			this.errors.textContent = '';
		}

		this.submitButton.disabled = !this.isValid;
	}
}
