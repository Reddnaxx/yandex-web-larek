import type { IEvents } from '../base/events';

export interface IModalModel {
	open(content: HTMLElement): void;
	close(): void;
}

export class ModalModel implements IModalModel {
	constructor(protected events: IEvents) {}

	open(content: HTMLElement): void {
		this.events.emit('modal:open', { containerTemplate: content });
	}

	close(): void {
		this.events.emit('modal:close');
	}
}
