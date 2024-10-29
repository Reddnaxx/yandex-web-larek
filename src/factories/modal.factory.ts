// ... существующий код ...

import { IEvents } from '@/components/base/events';
import { IModalContent } from '@/components/modal';
import { BasketModalContent, IBasketModel } from '@/components/modals/basket';
import { CardPreview } from '@/components/modals/card-preview';
import { ContactsModalContent } from '@/components/modals/contacts';
import { OrderModalContent } from '@/components/modals/order';
import { SuccessModalContent } from '@/components/modals/success';
import { ShopApi } from '@/components/shop-api';
import { IOrder, IOrderResponse, IProduct } from '@/types';

export type ModalContentType = 'success' | 'basket' | 'order' | 'contacts' | 'card';

export class ModalContentFactory {
  private cache: Map<string, IModalContent> = new Map();

  constructor(
    private events: IEvents,
    protected basketModel: IBasketModel,
    protected api: ShopApi
  ) {}

  createModalContent(type: 'success', data?: IOrderResponse): SuccessModalContent;
  createModalContent(type: 'basket'): BasketModalContent;
  createModalContent(type: 'order', data?: IOrder): OrderModalContent;
  createModalContent(type: 'contacts', data?: IOrder): ContactsModalContent;
  createModalContent(type: 'card', data?: IProduct): CardPreview;
  createModalContent(type: ModalContentType, data?: unknown): IModalContent {
    const cacheKey = `${type}-${JSON.stringify(data)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as IModalContent;
    }

    let modalContent: IModalContent;
    switch (type) {
      case 'success':
        modalContent = new SuccessModalContent(this.events, data as IOrderResponse);
        break;
      case 'basket':
        modalContent = new BasketModalContent(this.events, this.basketModel, this);
        break;
      case 'order':
        modalContent = new OrderModalContent(this.events, data as IOrder, this);
        break;
      case 'contacts':
        modalContent = new ContactsModalContent(this.events, data as IOrder, this.api, this);
        break;
      case 'card':
        modalContent = new CardPreview(this.events, this.basketModel, data as IProduct);
        break;
      default:
        throw new Error(`Unknown modal content type: ${type}`);
    }

    this.cache.set(cacheKey, modalContent);
    return modalContent;
  }
}