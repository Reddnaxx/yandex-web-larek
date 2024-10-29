// ... существующий код ...

import type { IShopApi } from '@/components/api/shop-api.interface';
import type { IEvents } from '@/components/base/events';
import type { IModalContent } from '@/components/modal';
import type { IBasketModel } from '@/components/modals/basket';
import { BasketModalContent } from '@/components/modals/basket';
import { CardPreview } from '@/components/modals/card-preview';
import { ContactsModalContent } from '@/components/modals/contacts';
import { OrderModalContent } from '@/components/modals/order';
import { SuccessModalContent } from '@/components/modals/success';
import type { IOrder, IOrderResponse, IProduct } from '@/types';

export type ModalContentType =
	| 'success'
	| 'basket'
	| 'order'
	| 'contacts'
	| 'card';

export class ModalContentFactory {
	private _cache: Map<string, IModalContent> = new Map();

	constructor(
		private _events: IEvents,
		protected basketModel: IBasketModel,
		protected api: IShopApi
	) {}

	createModalContent(
		type: 'success',
		data?: IOrderResponse
	): SuccessModalContent;

	createModalContent(type: 'basket'): BasketModalContent;

	createModalContent(type: 'order', data?: IOrder): OrderModalContent;

	createModalContent(type: 'contacts', data?: IOrder): ContactsModalContent;

	createModalContent(type: 'card', data?: IProduct): CardPreview;

	createModalContent(type: ModalContentType, data?: unknown): IModalContent {
		const cacheKey = `${type}-${JSON.stringify(data)}`;

		if (this._cache.has(cacheKey)) {
			return this._cache.get(cacheKey) as IModalContent;
		}

		let modalContent: IModalContent;
		switch (type) {
			case 'success':
				modalContent = new SuccessModalContent(
					this._events,
					data as IOrderResponse
				);
				break;
			case 'basket':
				modalContent = new BasketModalContent(
					this._events,
					this.basketModel,
					this
				);
				break;
			case 'order':
				modalContent = new OrderModalContent(
					this._events,
					data as IOrder,
					this
				);
				break;
			case 'contacts':
				modalContent = new ContactsModalContent(
					this._events,
					data as IOrder,
					this.api,
					this
				);
				break;
			case 'card':
				modalContent = new CardPreview(
					this._events,
					this.basketModel,
					data as IProduct
				);
				break;
			default:
				throw new Error(`Unknown modal content type: ${type}`);
		}

		this._cache.set(cacheKey, modalContent);
		return modalContent;
	}
}
