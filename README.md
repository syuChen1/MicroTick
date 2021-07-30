# MicroTick ![](https://github.com/syuChen1/MicroTick/actions/workflows/deploy-manifests.yaml/badge.svg)
Full-Stack Ticketing Web App Built with Event-Based Microservices Architecture

## Features:
- Any user can list a ticket for an event for sale
- Users can see the list of tickets and purchase a ticket
- When a user attemps to purachase a ticket, the ticket is "locked" for 15 minutes. The user has 15 minutes to complete the payment
- While "locked", no other user can purchase the ticket. After 15 minutes, if the ticket is not paid, the order will be cancelled and the tickets should "unlock"
- Tickets prices can be edited if they are not locked

## Build with:
- Frontend: **React, Next.js, JavaScript**
- Backend: **TypeScript, Node, Express, MongoDB, NAT-Streaming, Redis, Bull**
- Test: **Jest, Supertest**
- Technology: **Kubernetes, Docker, Skaffold, Nginx, Github Action, Digital Ocean**

## Sturecture:
MicroTick is consist of 5 Services, 1 Client,1 Event bus and 1 Load Balancer.


![image](https://user-images.githubusercontent.com/44207825/127675164-70706561-2fb5-4a00-adba-833da9315152.png)

### Services:
- Auth - Everything related to user sign up, sign in and sign out
- Tickets - Tickets creation/editing. Knows weather a ticket can be updated
- Orders - Order creation/editing. Knows the status of a order (created, exipred, completed)
- Expiration - Watches for order creation and store in a queue with [Bull](https://optimalbits.github.io/bull/). Send cancel event after 15 minutes
- Payments - Handles credit card payments with [Stripe API](https://stripe.com/docs/api). Completes order if payment success.

Each Service is consists of 1 NODE deployment and 1 database/redis deployment. Each deployment inside a service is connected with k8s services through ClusterIP. 
### Event Bus
The event bus is implemented with [NAT-Streaming Services](https://docs.nats.io/nats-streaming-concepts/intro). The event bus allows services to communicated with others through publishing and listening events. There are 6 channels inside this archicature: *ticket:created, ticket:updated, order:created, order:updated, expiration:complete, payment:created*. For more detailed information the event flow, checkout [event-flow.md](https://github.com/syuChen1/MicroTick/blob/main/event-flow.md)
- NAT-Streaming Services will store all published events. So when a services disconnected or a new services is added, it can receive all the event it missed from the channels it is listening to.
- To prevent listen concurrency issue on mutiple copy of one service (One instance of the service process an event before the piror event being processed by another instance), I implemented a version controll system using [mongoose-update-if-current](https://www.npmjs.com/package/mongoose-update-if-current). An event will be processed only if its version is 1 greater than the record. Otherwise it will be send back to the event queue and waits to be processed. 
- "Version" number will be increamnented only if the **primary** service responsible for a record emits an event to describe a create/update/destory to a record.
### Load Balancer
The load balancer is implemented with [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/). Ingress-nginx will direct routes to different services based on the starting url and will direct anything not found in the services to client. 
### Client
![image](https://user-images.githubusercontent.com/44207825/127682561-023161f0-80ec-4eb9-a847-5442d9f538ad.png)
The client is implemented with [Next.js](https://nextjs.org/) which utilize server-side rendering. Next.js will receive a Request from the browser, then make internal requests to Services and finally build up a fully rendered HTML file with content and send back to the browser in one single request. 
- User will see the content appear in the browser much quicker, especially on mobile devices. 
- Better Search engine optimization.

## CI/CD and Deployment Workflow
![image](https://user-images.githubusercontent.com/44207825/127685432-9c91efc7-9e22-4d28-a96d-60943304a369.png)

# Check out the [Event Flow](https://github.com/syuChen1/MicroTick/blob/main/event-flow.md) between different services
