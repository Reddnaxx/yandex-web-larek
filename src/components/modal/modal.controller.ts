import { IEvents } from '../base/events';
import { IModalData, ModalView } from './modal';

export interface IModalController {
	init(): void;
}

export class ModalController implements IModalController {
	constructor(protected modalView: ModalView, protected events: IEvents) {}

	init(): void {
		this.events.on('modal:open', (data: IModalData) => {
			this.modalView.render({
				container: data.container,
				content: data.content,
			});
			this.modalView.show();
		});

		this.events.on('modal:close', () => {
			this.modalView.hide();
		});
	}
}
