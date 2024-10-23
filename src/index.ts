import { EventEmitter } from './components/base/events';
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

const galleryModel = new GalleryModel(events);
const galleryView = new GalleryView(ensureElement('.gallery'), events);
const galleryController = new GalleryController(events, galleryView);

modalController.init();
galleryController.init();

api.getProducts().then((products) => {
	galleryModel.setProducts(products);
});
