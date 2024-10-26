import { IProducts, IView } from '@/types';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { IEvents } from '../base/events';
import { GalleryItemView } from './components/gallery-item/gallery-item';

export class GalleryView implements IView {
	protected modalTemplate: HTMLTemplateElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		this.modalTemplate = ensureElement('#card-preview') as HTMLTemplateElement;

		this.initEvents();
	}

	protected initEvents(): void {
		this.events.on('catalog:set', (products: IProducts) => {
			this.renderGalleryItems(products);
		});
	}

	render(data: { items: HTMLElement[] }): HTMLElement {
		if (data) {
			this.container.replaceChildren(...data.items);
		}

		return this.container;
	}

	protected renderGalleryItems(products: IProducts): void {
		const modalTemplate = cloneTemplate('#card-preview') as HTMLTemplateElement;

		this.render({
			items: products.map((product) => {
				const container = cloneTemplate('#card-catalog');
				const itemView = new GalleryItemView(
					container,
					modalTemplate,
					this.events
				);
				return itemView.render(product);
			}),
		});
	}
}
