import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@csy-microtick/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
