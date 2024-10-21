import { EventEmitter } from './components/base/events';
import { BasketModel, BasketView } from './components/basket';
import {
	GalleryItemView,
	GalleryModel,
	GalleryView,
} from './components/gallery';
import { IProductResponse, ShopApi } from './components/shop-api';
import './scss/styles.scss';
import { IProducts } from './types';
import { cloneTemplate } from './utils/utils';

const api = new ShopApi();
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'), events);
const basketModel = new BasketModel(events);
const galleryModel = new GalleryModel(events);
const galleryView = new GalleryView(document.querySelector('.gallery'), events);

const renderCatalog = (products: IProducts) => {
	galleryView.render({
		items: products.map((product) => {
			const container = cloneTemplate('#card-catalog');
			const itemView = new GalleryItemView(container, events);
			return itemView.render(product);
		}),
	});
};

events.on('catalog:set', (products: IProductResponse) => {
	renderCatalog(products.items);
});

api.getProducts().then((products) => {
	galleryModel.setProducts(products);
});
