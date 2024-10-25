import { EventEmitter } from './components/base/events';
import { BasketModel } from './components/basket';
import { BasketButton } from './components/basket/basket-button';
import { BasketModalContent } from './components/basket/basket-modal-content';
import { GalleryModel, GalleryView } from './components/gallery';
import { GalleryController } from './components/gallery/gallery.controller';
import { ModalView } from './components/modal';
import { ModalController } from './components/modal/modal.controller';
import { ShopApi } from './components/shop-api';
import './scss/styles.scss';
import { ensureElement } from './utils/utils';

const api = new ShopApi();
const events = new EventEmitter();

const modal = new ModalView(ensureElement('#modal-container'), events);
const modalController = new ModalController(modal, events);

const basketModel = new BasketModel(events, api);
const basketContent = new BasketModalContent(events, basketModel);
const basketButton = new BasketButton(
	ensureElement('.header__basket'),
	events,
	basketContent,
	api
);

const galleryModel = new GalleryModel(events);
const galleryView = new GalleryView(ensureElement('.gallery'), events);
const galleryController = new GalleryController(events, galleryView);

modalController.init();
galleryController.init();

api.getProducts().then((products) => {
	galleryModel.setProducts(products);
});
