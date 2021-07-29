import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@csy-microtick/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
