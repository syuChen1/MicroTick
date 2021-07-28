import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@csy-microtick/common';
import { Ticket } from '../../models/ticket';

export class TicktCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'order-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {}
}
