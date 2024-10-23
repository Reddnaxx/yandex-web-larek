import { IProduct, IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { CardPreview } from '../card-preview/card-preview';
import { IModalData } from '../modal';
import { ShopApi } from '../shop-api';
import { GalleryItemCategory } from './gallery-item-category.enum';

export class GalleryItemView implements IView {
	protected product: IProduct;

	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;
	protected category: HTMLSpanElement;

	constructor(
		protected container: HTMLElement,
		protected modal: HTMLTemplateElement,
		protected events: IEvents
	) {
		this.title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this.container
		);
		this.image = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);
		this.price = ensureElement<HTMLSpanElement>('.card__price', this.container);
		this.category = ensureElement<HTMLSpanElement>(
			'.card__category',
			this.container
		);

		this.container.onclick = () => {
			this.events.emit('modal:open', {
				containerTemplate: this.modal,
				content: new CardPreview(this.product),
			} satisfies IModalData);
		};
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.product = data;

			this.title.textContent = data.title;
			this.image.src = ShopApi.getImageUrl(data.image);
			this.price.textContent = data.price?.toString() ?? 'бесценно';
			this.category.textContent = data.category;

			if (data.category in GalleryItemCategory) {
				this.category.classList.add(
					GalleryItemCategory[data.category as keyof typeof GalleryItemCategory]
				);
			}
		}

		return this.container;
	}
}
