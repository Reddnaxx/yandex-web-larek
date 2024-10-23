import { IProducts } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { IEvents } from '../base/events';
import { IProductResponse } from '../shop-api';
import { GalleryView } from './gallery';
import { GalleryItemView } from './gallery-item';

export interface IGalleryController {
	init(): void;
	renderGallery(products: IProducts): void;
}

export class GalleryController implements IGalleryController {
	constructor(protected events: IEvents, protected galleryView: GalleryView) {}

	init(): void {
		this.events.on('catalog:set', (products: IProductResponse) => {
			this.renderGallery(products.items);
		});
	}

	renderGallery(products: IProducts): void {
		const modalTemplate = cloneTemplate('#card-preview') as HTMLTemplateElement;

		this.galleryView.render({
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
