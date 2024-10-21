import { IView } from '../../types';
import { IEvents } from '../base/events';

export class BasketView implements IView {
	constructor(protected container: HTMLElement, protected events: IEvents) {}

	render(data: { items: HTMLElement[] }): HTMLElement {
		if (data) {
			this.container.replaceChildren(...data.items);
		}

		return this.container;
	}
}
