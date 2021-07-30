# MicroTick Event Flow

#### Event starts with a user creates a new ticket
- When a user creates a ticket, the Ticket Service will publish a **ticket:created** event. The Order Service will receive the event and create a deplicated record of ticket inside its database. 
- When a user updates a ticket, the Ticket Service will publish a **ticket:updated** event. The Order Service will receive the event and update the ticket record inside its database. 
![image](https://user-images.githubusercontent.com/44207825/127701855-fbf285d2-4ac8-4dd7-842c-6fded6ef1801.png)

#### After the ticket is created, a user can choose to place an order for a ticket
- When a user creates an order, the Order Service will publish a **order:created** event.
- The Expiration Service will receive the event and create a push a 15-minute timer associated with the orderId into redis.
- The Payment Service will receive the event and create a deplicated record of order inside its database. This will allow the user to pay for the order
- The Ticket Service will receive the event and updated the ticked with the orderID. This will prevent ticket being modify or re-order.
![image](https://user-images.githubusercontent.com/44207825/127702327-ad042fa7-ff57-4e0f-91b9-2f7a2a508d17.png)

#### After the order is created, a user has 15 minutes to pay for the order.
- When a user pay for the order within 15 minutes, the Payment Service will publish a **payment:created** event.
- The Order Service will receive the event and update the order status to complete.  
![image](https://user-images.githubusercontent.com/44207825/127702536-2f1417af-0342-4bf0-8df7-0027b6179625.png)

#### The Redis instance will send a event after the 15-minute timer *no matter* the order is paid or not.
- When receiving a timeout event from redis, the Expiration Service will publish a **expiration:complete** event.
- The Order Service will receive the **expiration:complete** event. It will first check if the order is complete(paid). If the order is not complete, it will change the status of the order to cancelled. Then it will publish an **order:cancelled** event.
- The Payment Service will receive the **order:cancelled** event. It will set the status of the order inside its database to cancelled. This will prevent the user from paying for the order. 
- The Tickets Service will receive the **order:cancelled* event. It will set orderId field of the ticket to null. This will allow the ticket to be modified or ordered again. 
![image](https://user-images.githubusercontent.com/44207825/127704108-022bdda7-a029-4b39-9074-cab4c0b6515d.png)

