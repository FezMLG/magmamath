# MagmaMath

Microservices-based application with two services - User Service and Notification Service.

## How to run:
- Clone the repository.
- Run `docker-compose up` in the root directory.
- Go to `packages/user-service`, fill out env file and run `npm run start`.
- Go to `packages/notification-service` and run `npm run start`.

## Setup & Configuration:
- Node.js project using TypeScript and NestJS.
- docker-compose for orchestration of microservices.
- MongoDB as a datastore.
- RabbitMQ as a message broker.

## User Service:
- CRUD operations for a user entity that includes fields: id, name, email, and createdAt.
- Validate the input data using appropriate libraries or utilities.
- Implement pagination for the GET method that retrieves users.

## Notification Service:
- Consume messages from the message broker.
- Whenever a user is created, send a mock notification (console log) welcoming the user.
- Whenever a user is deleted, send a mock notification (console log) informing about the deletion.