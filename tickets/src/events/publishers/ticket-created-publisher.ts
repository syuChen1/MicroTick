import { Publisher, Subjects, TicketCreatedEvent } from '@csy-microtick/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
