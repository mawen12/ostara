import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter/rxjs';
import { Events } from './events';

// 系统事件发射器，只发出Events类型的事件
export const systemEvents = new EventEmitter() as TypedEmitter<Events>;
