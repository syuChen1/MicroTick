import { Publisher, Subjects, TicketUpdatedEvent } from '@csy-microtick/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
