import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { GalleryItemCategory } from '../gallery/gallery-item-category.enum';
import { IModalContent } from '../modal';
import { ShopApi } from '../shop-api';

export class CardPreview implements IModalContent {
	protected title: HTMLHeadingElement;
	protected text: HTMLParagraphElement;
	protected category: HTMLSpanElement;
	protected price: HTMLSpanElement;
	protected button: HTMLButtonElement;
	protected image: HTMLImageElement;

	constructor(protected content: IProduct) {}

	getElements(container: HTMLElement): void {
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
		this.price.textContent = this.content.price?.toString() ?? 'бесценно';
		this.image.src = ShopApi.getImageUrl(this.content.image);

		if (this.content.category in GalleryItemCategory) {
			this.category.classList.add(
				GalleryItemCategory[
					this.content.category as keyof typeof GalleryItemCategory
				]
			);
		}
	}
}
