import { Message } from 'node-nats-streaming';
import { Listener } from './base-lisrtener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-services';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data! ', data);

    msg.ack();
  }
}

export { TicketCreatedListener };
