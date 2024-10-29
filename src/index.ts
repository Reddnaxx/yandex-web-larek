import { ensureElement } from '@/utils/utils';
import { EventEmitter } from './components/base/events';
import { BasketButton } from './components/basket-button';
import { GalleryModel, GalleryView } from './components/gallery';
import { ModalModel, ModalView } from './components/modal';
import { BasketModel } from './components/modals/basket';
import { ShopApi } from './components/shop-api';
import { ModalContentFactory } from './factories/modal.factory';
import './scss/styles.scss';

const api = new ShopApi();
const events = new EventEmitter();

const basketModel = new BasketModel(events, api);
const modalContentFactory = new ModalContentFactory(events, basketModel, api);

const basketContent = modalContentFactory.createModalContent('basket')

const modalModel = new ModalModel(events);
const modalView = new ModalView(ensureElement('#modal-container'), events);

const basketButton = new BasketButton(
	ensureElement('.header__basket'),
	events,
	basketContent,
	basketModel,
	api
);

const galleryModel = new GalleryModel(events);
const galleryView = new GalleryView(ensureElement('.gallery'), events, basketModel, modalContentFactory);

api.getProducts().then((products) => {
	galleryModel.setProducts(products.items);
});
