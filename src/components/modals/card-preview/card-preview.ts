import { IEvents } from '@/components/base/events';
import { GalleryItemCategory } from '@/components/gallery';
import { IModalContent } from '@/components/modal';
import { ShopApi } from '@/components/shop-api';
import { IProduct } from '@/types';
import { ensureElement } from '@/utils/utils';
import { BasketModel, IBasketModel } from '../basket';

export class CardPreview implements IModalContent {
	protected basket: IBasketModel = BasketModel.Instance;

	protected title: HTMLHeadingElement;
	protected text: HTMLParagraphElement;
	protected category: HTMLSpanElement;
	protected price: HTMLSpanElement;
	protected button: HTMLButtonElement;
	protected image: HTMLImageElement;

	protected inBasket = false;

	constructor(protected content: IProduct, protected events: IEvents) {}

	getElements(container: HTMLElement): void {
		this.inBasket = this.basket.hasItem(this.content.id);
		this.category = ensureElement<HTMLSpanElement>(
			'.card__category',
			container
		);
		this.title = ensureElement<HTMLHeadingElement>('.card__title', container);
		this.text = ensureElement<HTMLParagraphElement>('.card__text', container);
		this.price = ensureElement<HTMLSpanElement>('.card__price', container);
		this.button = ensureElement<HTMLButtonElement>('.card__button', container);
		this.image = ensureElement<HTMLImageElement>('.card__image', container);
	}

	setElements(): void {
		this.category.textContent = this.content.category;
		this.title.textContent = this.content.title;
		this.text.textContent = this.content.description;
		this.price.textContent = this.content.price
			? this.content.price.toString() + ' синапсов'
			: 'бесценно';
		this.image.src = ShopApi.getImageUrl(this.content.image);

		if (this.content.category in GalleryItemCategory) {
			Object.values(GalleryItemCategory).forEach(className => {
				this.category.classList.remove(className);
			});

			this.category.classList.add(
				GalleryItemCategory[
					this.content.category as keyof typeof GalleryItemCategory
				]
			);
		}

		this.button.disabled = !this.content.price;
		this.button.onclick = () => this.toggleButtonState();

		this.button.textContent = this.inBasket
			? 'Удалить из корзины'
			: 'Добавить в корзину';
	}

	toggleButtonState() {
		if (this.inBasket) {
			this.events.emit('basket:remove', { id: this.content.id });
			this.button.textContent = 'Добавить в корзину';
		} else {
			this.events.emit('basket:add', { id: this.content.id });
			this.button.textContent = 'Удалить из корзины';
		}
		this.inBasket = !this.inBasket;
	}
}
