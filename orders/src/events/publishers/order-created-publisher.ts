import { Publisher, OrderCreatedEvent, Subjects } from '@csy-microtick/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
