import { IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class GalleryView implements IView {
	protected modalTemplate: HTMLTemplateElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		this.modalTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
	}

	render(data: { items: HTMLElement[] }): HTMLElement {
		if (data) {
			this.container.replaceChildren(...data.items);
		}

		return this.container;
	}
}
