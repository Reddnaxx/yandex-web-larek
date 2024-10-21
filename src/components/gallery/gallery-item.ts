import { IProduct, IView } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ShopApi } from '../shop-api';

export class GalleryItemView implements IView {
	protected title: HTMLHeadingElement;
	protected image: HTMLImageElement;
	protected price: HTMLSpanElement;
	protected category: HTMLSpanElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		this.title = ensureElement(
			'.card__title',
			this.container
		) as HTMLHeadingElement;
		this.image = ensureElement(
			'.card__image',
			this.container
		) as HTMLImageElement;
		this.price = ensureElement(
			'.card__price',
			this.container
		) as HTMLSpanElement;
		this.category = ensureElement(
			'.card__category',
			this.container
		) as HTMLSpanElement;
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.title.textContent = data.title;
			this.image.src = ShopApi.getImageUrl(data.image);
			this.price.textContent = data.price?.toString() ?? 'бесценно';
			this.category.textContent = data.category;
		}

		return this.container;
	}
}
