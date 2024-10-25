import { IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export interface IModalContent {
	getElements(container: HTMLElement): void;
	setElements(content: object): void;
}

export interface IModalData {
	container: HTMLTemplateElement;
	content: IModalContent;
}

export class ModalView implements IView {
	protected contentContainer: HTMLDivElement;
	protected wrapperContainer: HTMLDivElement;
	protected closeButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		this.getHTMLElements(container);

		this.wrapperContainer.onclick = (event) => {
			event.stopPropagation();
		};

		this.initEvents();
	}

	protected initEvents(): void {
		this.container.onclick = () => {
			this.events.emit('modal:close');
		};

		this.closeButton.onclick = () => {
			this.events.emit('modal:close');
		};
	}

	protected getHTMLElements(container: HTMLElement) {
		this.contentContainer = ensureElement<HTMLDivElement>(
			'.modal__content',
			container
		);
		this.wrapperContainer = ensureElement<HTMLDivElement>(
			'.modal__container',
			container
		);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
	}

	show(): void {
		this.container.classList.add('modal_active');
	}

	hide(): void {
		this.container.classList.remove('modal_active');
	}

	render(data: {
		container: HTMLElement;
		content: IModalContent;
	}): HTMLElement {
		if (data) {
			this.contentContainer.replaceChildren(data.container);
		}

		if (data.content) {
			data.content.getElements(this.contentContainer);
			data.content.setElements(null);
		}

		return this.container;
	}
}
