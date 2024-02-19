# Voting Manager Tool

## Description
Voting Manager Tool is a voting management application that leverages a Solidity smart contract, a back-end service, and a front-end application.

## Features

### Smart Contract
The smart contract, developed in Solidity and deployed on the Optimism Sepolia network, implements a voting mechanism. This contract allows for the creation of votes, casting of votes, and conclusion of voting. Additionally, it emits events for each of these actions.

### Back-end Service
The back-end service, integrated using a NestJS project, is responsible for listening to the events emitted by the smart contract. It has a cron job running periodically to listen for relevant blockchain events. When these events are heard, it syncs with our database, which feeds data to our front-end. It also provides RESTful APIs that serve the event data to the front-end.

### TheGraph Subgraph
The application integrates a subgraph using TheGraph for indexing blockchain data. This allows for efficient querying of blockchain events and data, enhancing the performance and user experience of the application.

### Front-end Application
The front-end application is responsible for displaying the events from the smart contract. This application has been modified to fetch event data from the back-end API instead of directly from the blockchain. The user interface is user-friendly and displays real-time updates.

### Testing and Documentation
Unit tests have been written for the smart contract and for the API endpoints. Comprehensive documentation is provided, including setup instructions for the smart contract, back-end service, and front-end application.

## Installation and Running Guide
1. Clone the GitHub repository.
2. Navigate to the `neitec api` folder and create a `.env` file with the following environment variables:
    ```
    GRAPHQL_API_URL="your api url"
    MONGODB_URI="your mongodb uri"
    ```
3. Run `npm install` to install all dependencies.
4. Run `npm run start` to start the back-end service. Once this is done, our backend will be running, listening to events on the blockchain and syncing our MongoDB database as necessary.
5. Open another console, navigate to the `voting-app` folder.
6. Run `npm install` to install all dependencies.
7. Run `npm run start` to start the front-end application.
8. Follow the setup and running instructions for the smart contract, back-end service, and front-end application provided in the documentation.

## Contribution
To contribute to this project, please fork the repository and propose your changes via a pull request.

## License
This project is licensed under the terms of the MIT license.