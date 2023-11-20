import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _messages: Map<number, Message> = new Map<number, Message>();

  get messages() {
    return this._messages;
  }

  public success(message: string, durationMS = 5000): number {
    return this.addMessage(new Message(message, MessageType.SUCCESS, durationMS));
  }

  public info(message: string, durationMS = 5000): number {
    return this.addMessage(new Message(message, MessageType.INFO, durationMS));
  }

  public warning(message: string, durationMS = 5000): number {
    return this.addMessage(new Message(message, MessageType.WARNING, durationMS));
  }

  public error(message: string, durationMS = 5000): number {
    return this.addMessage(new Message(message, MessageType.DANGER, durationMS));
  }

  private addMessage(message: Message): number {
    const id = this.generateId();
    this.messages.set(id, message);
    setTimeout(() => this.removeMessage(id), message.duration);
    return id;
  }

  public removeMessage(id: number): void {
    this.messages.delete(id);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000000);
  }
}

class MessageType {
  static readonly SUCCESS = new MessageType('success');
  static readonly INFO = new MessageType('info');
  static readonly WARNING = new MessageType('warning');
  static readonly DANGER = new MessageType('danger');

  constructor(private _type: string) {}

  public get type(): string {
    return this._type;
  }
}

class Message {
  constructor(private _body: string, private messageType: MessageType, private durationMS: number = 5000) {}

  get body(): string {
    return this._body;
  }

  get type(): string {
    return this.messageType.type;
  }

  get duration(): number {
    return this.durationMS;
  }
}
