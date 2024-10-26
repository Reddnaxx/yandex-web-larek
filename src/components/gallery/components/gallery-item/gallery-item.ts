import { IEvents } from '@/components/base/events';
import { IModalData } from '@/components/modal';
import { BasketModel, IBasketModel } from '@/components/modals/basket';
import { CardPreview } from '@/components/modals/card-preview';
import { ShopApi } from '@/components/shop-api';
import { IProduct, IView } from '@/types';
import { ensureElement } from '@/utils/utils';
import { GalleryItemCategory } from './gallery-item-category.enum';

export class GalleryItemView implements IView {
	protected basket: IBasketModel = BasketModel.Instance;

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
				container: this.modal,
				content: new CardPreview(this.product, this.events),
			} satisfies IModalData);
		};
	}

	render(data: IProduct): HTMLElement {
		if (data) {
			this.product = data;

			this.title.textContent = data.title;
			this.image.src = ShopApi.getImageUrl(data.image);
			this.category.textContent = data.category;

			this.price.textContent = data.price
				? data.price.toString() + ' синапсов'
				: 'бесценно';

			if (data.category in GalleryItemCategory) {
				this.category.classList.add(
					GalleryItemCategory[data.category as keyof typeof GalleryItemCategory]
				);
			}
		}

		return this.container;
	}
}
