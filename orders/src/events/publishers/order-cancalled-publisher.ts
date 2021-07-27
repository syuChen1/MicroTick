import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@csy-microtick/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
