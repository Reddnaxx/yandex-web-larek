import { ensureElement } from '@/utils/utils';
import { EventEmitter } from './components/base/events';
import { BasketButton } from './components/basket-button';
import { GalleryModel, GalleryView } from './components/gallery';
import { ModalModel, ModalView } from './components/modal';
import { BasketModalContent, BasketModel } from './components/modals/basket';
import { ShopApi } from './components/shop-api';
import './scss/styles.scss';

const api = new ShopApi();
const events = new EventEmitter();

const modalModel = new ModalModel(events);
const modalView = new ModalView(ensureElement('#modal-container'), events);

const basketModel = new BasketModel(events, api);
const basketContent = new BasketModalContent(events);

const basketButton = new BasketButton(
	ensureElement('.header__basket'),
	events,
	basketContent,
	api
);

const galleryModel = new GalleryModel(events);
const galleryView = new GalleryView(ensureElement('.gallery'), events);

api.getProducts().then((products) => {
	galleryModel.setProducts(products.items);
});
